import * as clone from 'clone';
import * as React from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import {
  IHierarchyContextData,
  INestedObject,
  IParsedArray,
  ISidebarDrawerProps,
} from '../interfaces';

const HierarchyContext = createContext({} as IHierarchyContextData);

export function HierarchyContextProvider({
  children,
  onExpandNodes,
  treeRef,
  data,
}: ISidebarDrawerProps): JSX.Element {
  const [hierarchy, setHierarchy] = useState<INestedObject>(data);
  const hierarchyRef = useRef<INestedObject>(data);
  const draggingItemRef = useRef<INestedObject>(null);

  React.useEffect(() => {
    hierarchyRef.current = hierarchy;
  }, [hierarchy]);

  const nestedObjectToArray = useCallback((data: INestedObject) => {
    const array: IParsedArray[] = [];

    const loopChildren = (
      dataChildren: INestedObject,
      parentId?: number | string
    ) => {
      const insert = {
        id: dataChildren.id,
        label: dataChildren.label,
        parentId: null as number | string | null,
      };
      if (parentId || typeof parentId === 'number') {
        insert.parentId = parentId;
      }
      array.push(insert);
      if (
        Array.isArray(dataChildren.children) &&
        dataChildren.children.length > 0
      )
        dataChildren.children.map((child) => {
          loopChildren(child, dataChildren.id);
        });
    };

    loopChildren(data);

    return array;
  }, []);

  const arrayToNestedObject = useCallback(
    (data: IParsedArray[]): INestedObject => {
      const first = data.filter((i) => !i.parentId);
      // let array = [...data];
      if (first.length !== 1)
        return {
          id: 0,
          children: [],
          label: 'error',
        } as INestedObject;

      let nestedObject: INestedObject = {
        id: first[0].id,
        label: first[0].label,
        children: [],
      };

      const loopArray = (
        dataArray: IParsedArray[],
        parentId: number | string
      ) => {
        const children = [] as INestedObject[];
        dataArray.map((child) => {
          if (child.parentId === parentId) {
            const insert = {
              id: child.id,
              label: child.label,
              children: [] as INestedObject[],
            };
            children.push(insert);
          }
        });

        if (children.length === 0) return;

        const newNestedObject = editById(
          parentId,
          {
            children,
          },
          'replace',
          nestedObject
        );

        nestedObject = newNestedObject;

        children.map((childLoop) => {
          loopArray(dataArray, childLoop.id);
        });
      };

      loopArray(data, first[0].id);

      return nestedObject;
    },
    []
  );

  const editById = useCallback(
    (
      id: number | string,
      data: Partial<INestedObject>,
      action = 'add' as 'replace' | 'add' | 'remove',
      nestedObject?: INestedObject
    ) => {
      let nestedObjectClone = nestedObject
        ? { ...nestedObject }
        : { ...hierarchyRef.current };
      nestedObjectClone = clone(nestedObjectClone);

      if (nestedObjectClone.id === id) {
        if (!action || action === 'replace')
          return { ...nestedObjectClone, ...data };
        if (!action || action === 'add')
          return {
            ...nestedObjectClone,
            ...data,
            children: [
              ...nestedObjectClone.children,
              ...(data.children ? data.children : []),
            ],
          };
        if (!action || action === 'remove')
          return {
            ...nestedObjectClone,
            ...data,
            children: [
              ...nestedObjectClone.children.filter((child) =>
                data.children
                  ? !data.children.map((i) => i.id).includes(child.id)
                  : child
              ),
            ],
          };
      }

      if (!nestedObjectClone.children)
        return nestedObjectClone as INestedObject;

      const newChildren: INestedObject[] = nestedObjectClone.children.map(
        (child) => {
          return editById(id, data, action, child);
        }
      );

      return {
        ...nestedObjectClone,
        children: newChildren || [],
      } as INestedObject;
    },
    []
  );

  const addChildrenById = useCallback(
    (
      id: number | string,
      data: INestedObject[], // is the data we want the new node to have
      nestedObject?: INestedObject // the parent of where we want to add the new node
    ) => {
      let nestedObjectClone = nestedObject
        ? { ...nestedObject }
        : { ...hierarchyRef.current };
      nestedObjectClone = clone(nestedObjectClone);

      // adds the new data to children
      // id should be the dropItem id
      if (nestedObjectClone.id === id) {
        return {
          ...nestedObjectClone,
          children: [...nestedObjectClone.children, ...(data ? data : [])],
        };
      }

      // adds a node to an empty tree?
      if (!nestedObjectClone.children)
        return nestedObjectClone as INestedObject;

      // recursively searches tree for the dropItem
      const newChildren: INestedObject[] = nestedObjectClone.children.map(
        (child) => {
          return addChildrenById(id, data, child);
        }
      );
      
      // returns updated HierarchyData
      return {
        ...nestedObjectClone,
        children: newChildren || [],
      } as INestedObject;
    },
    []
  );

  const removeById = useCallback(
    (
      id: number | string,
      dataToRemove: Array<number | string>,
      nestedObject?: INestedObject
    ) => {
      let nestedObjectClone = nestedObject
        ? { ...nestedObject }
        : { ...hierarchyRef.current };
      nestedObjectClone = clone(nestedObjectClone);

      if (nestedObjectClone.id === id) {
        return {
          ...nestedObjectClone,
          ...dataToRemove,
          children: [
            ...nestedObjectClone.children.filter((child) =>
              dataToRemove
                ? !dataToRemove.map((i) => i).includes(child.id)
                : !child
            ),
          ],
        };
      }

      if (!nestedObjectClone.children)
        return nestedObjectClone as INestedObject;

      const newChildren: INestedObject[] = nestedObjectClone.children.map(
        (child) => {
          return removeById(id, dataToRemove, child);
        }
      );

      return {
        ...nestedObjectClone,
        children: newChildren || [],
      } as INestedObject;
    },
    []
  );

  const findParentByChildId = useCallback(
    (id: number | string, nestsObject?: INestedObject) => {
      let nestedObject = nestsObject
        ? { ...nestsObject }
        : { ...hierarchyRef.current };
      nestedObject = clone(nestedObject);

      const loop = (
        childObject: INestedObject,
        parentObject: INestedObject | null,
        arrayParentIdPaths = [] as Array<number | string>
      ) => {
        const array: Array<number | string> = [...arrayParentIdPaths];

        if (parentObject?.id) array.push(parentObject.id);

        if (childObject.id === id) {
          return { parent: parentObject, path: array };
        }

        if (!childObject?.children) return { parent: null, path: [] };

        let parent: {
          parent: INestedObject | null;
          path: Array<number | string>;
        } = { parent: null, path: [] };

        childObject.children.map((child) => {
          const loopParent = loop(child, childObject, array);
          if (loopParent.parent !== null) {
            parent = loopParent;
          }
        });

        return parent;
      };

      const parentData = loop(nestedObject, null);

      return parentData;
    },
    []
  );

  const findById = useCallback((
    // nestedObject: INestedObject,
    id: number | string,
    nestsObject?: INestedObject
  ) => {
    console.log('ID given to findByID:', id);
    console.log('this is hierarchyRef.current', hierarchyRef.current);
    let nestedObject = nestsObject
      ? { ...nestsObject }
      : { ...hierarchyRef.current };
    nestedObject = clone(nestedObject);

    const loop = (nestedObject: INestedObject, itemId: number | string) => {
      if (nestedObject.id === id) {
        return nestedObject;
      }
      if (!nestedObject?.children) return null;

      let item: INestedObject | null = null;

      nestedObject.children.map((child) => {
        const loopItem = loop(child, itemId);
        if (loopItem !== null) item = loopItem;
        return;
      });

      return item;
    };

    const Item = loop(nestedObject, id);

    return Item;
  }, []);

  const isChild = (parentId: number | string, childId: number | string) => {
    const { path } = findParentByChildId(childId);
    return path.includes(parentId);
  };

  useImperativeHandle(
    treeRef,
    () => {
      return {
        onExpandNodes,
        findById,
        findParentByChildId,
        removeById,
        editById,
        addChildrenById,
        nestedObjectToArray,
        arrayToNestedObject,
        data: hierarchyRef.current,
      };
    },
    [
      addChildrenById,
      arrayToNestedObject,
      editById,
      findById,
      findParentByChildId,
      nestedObjectToArray,
      onExpandNodes,
      removeById,
    ]
  );

  return (
    <HierarchyContext.Provider
      value={{
        draggingItemRef,
        hierarchyRef,
        hierarchy,
        setHierarchy,
        nestedObjectToArray,
        arrayToNestedObject,
        addChildrenById,
        editById,
        removeById,
        findParentByChildId,
        findById,
        isChild,
      }}
    >
      {children}
    </HierarchyContext.Provider>
  );
}

export const useHierarchyData = (): IHierarchyContextData =>
  useContext(HierarchyContext);
