import * as React from 'react';
import { useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { nanoid } from 'nanoid';

import { isLastNode } from '..';
import { useHierarchyData } from '../../context/HierarchyContextProvider';
import { useDebounce } from '../../hooks/useDebounce';
import { INestedObject } from '../../interfaces';
import { IRenderCard } from '../interfaces';
import { RenderBtn } from '../RenderBtn';
import {
  CardArea,
  RenderLabel,
  StyledLabel,
  RenderCarPersonal,
} from './styles';

export const RenderCard = ({
  data,
  setExpand,
  expand,
  mock,
  prop: { renderCard, ...prop },
}: IRenderCard) => {
  const {
    setHierarchy,
    hierarchyRef,
    addChildrenById,
    editById,
    isChild,
    findParentByChildId,
    findById,
    draggingItemRef,
  } = useHierarchyData();

  const node = prop.node;
  const label = data[node.label];
  const clx = ['org-tree-node-label-inner'];

  if (mock) {
    clx.push('mock_card');
  }

  const onAppendMock = (id: number | string, label: string) => {
    // add renderNode if has already children inside
    const componentChildren = document.getElementById(`children_${id}`);
    if (componentChildren) {
      const elementMockLabel = document.getElementById(`label_text_mock`);
      const elementMockNode = document.getElementById(`node-tree-mock`);
      if (!elementMockLabel) return;
      if (!elementMockNode) return;

      elementMockLabel.innerText = label;

      elementMockNode.style.display = 'table-cell';
      elementMockNode.id = `node-tree-mock-clone`;
      const elementMockNodeClone = elementMockNode?.cloneNode(true);
      elementMockNode.style.display = 'none';
      elementMockNode.id = `node-tree-mock`;

      const elementMockNodeLastChild = elementMockNodeClone.lastChild;
      elementMockNodeLastChild &&
        elementMockNodeClone.removeChild(elementMockNodeLastChild);

      componentChildren.appendChild(elementMockNodeClone);
      return;
    }

    // add renderChildrenNode if does not have children inside
    const componentNode = document.getElementById(`node-tree-${id}`);
    if (componentNode) {
      const elementMockLabel = document.getElementById(`label_text_child_mock`);
      const componentMockChildren = document.getElementById(`children_mock`);

      if (!elementMockLabel) return;
      if (!componentMockChildren) return;

      elementMockLabel.innerText = label;

      const oldMockId = componentMockChildren.id;
      componentMockChildren.id = `node-tree-mock-clone`;
      const componentMockChildrenClone = componentMockChildren?.cloneNode(true);
      componentMockChildren.id = oldMockId;

      componentNode.appendChild(componentMockChildrenClone);
    }
  };

  const onRemoveMock = () => {
    const componentCloneMock = document.getElementById(`node-tree-mock-clone`);
    componentCloneMock && componentCloneMock.remove();
  };

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'box',
      item: data,
      options: {
        dropEffect: 'copy',
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  );

  useEffect(() => {
    const labelDoc = document.getElementById(`node-tree-${data.id}`);
    if (!labelDoc) return;

    // labelDoc.style.opacity = isDragging ? '0.5' : '1';

    const LabelClassName = labelDoc.className;

    labelDoc.className = isDragging
      ? labelDoc.className + ' RdtCant-drop'
      : LabelClassName.replace(' RdtCant-drop', '');

    draggingItemRef.current = data;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  const onDragEnter = (dropId: string | number) => {
    let dragLabel = 'Copy here';
    if (draggingItemRef.current) {
      const dragItemId = draggingItemRef.current.id;
      const dragItemLabel = draggingItemRef.current.label;
      console.log(dragItemId, dragItemLabel);
      const canDrop = dragItemId !== data.id && !isChild(dragItemId, data.id);
      dragLabel = draggingItemRef.current.label;
      if (!canDrop) return;
    }
    onAppendMock(dropId, dragLabel);
  };

  const onDragLeave = () => {
    onRemoveMock();
  };

  const onDrop = (drag: INestedObject) => {
    // console.log('this is dragItem', drag);
    const dragItem = findById(drag.id); // returns null if id is not found

    //! grab label for the item currently begin dragged to component tree
    const dragItemLabel = drag.label;

    const dropItem = data;

    // console.log('this is dropItem:', dropItem);

    // finds original parent of the drag item if the drag item already existed
    const { parent: parentDragItem } = findParentByChildId(drag.id);

    // console.log('this is parentDragItem:', parentDragItem);

    // if drag item already exists, update Hierarchy
    if (parentDragItem && dragItem) {
      const newParent = {
        ...parentDragItem,
        children: [...parentDragItem.children.filter((i) => i.id !== drag.id)],
      };

      const removedDragItemHierarchy = editById(
        parentDragItem.id,
        newParent,
        'replace'
      );

      const addedDragItemHierarchy = editById(
        dropItem.id,
        {
          children: [dragItem],
        },
        'add',
        removedDragItemHierarchy
      );

      setHierarchy(addedDragItemHierarchy);
      hierarchyRef.current = addedDragItemHierarchy;
    } else {
      // add a new node to the the tree
      // invoke addChildrenById passing in a dropItem.id and new component initial data state
      // returns a new DragItemHierarchy
      const addedNewDragItemHierarchy = addChildrenById(dropItem.id, [
        {
          //! potential bug when using nanoid to generate unique IDs (there is a very small chance nanoid generates a duplicate ID)
          id: nanoid(),
          label: dragItemLabel,
          children: [],
        },
      ]);

      // console.log(
      //   'this is addedNewDragItemHierarchy',
      //   addedNewDragItemHierarchy
      // );

      // update context with new DragItemHierarchy
      setHierarchy(addedNewDragItemHierarchy);
      hierarchyRef.current = addedNewDragItemHierarchy;

      // console.log(hierarchyRef.current);
    }
  };

  const { onDebounce } = useDebounce(onDragEnter, 300);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'box',
      canDrop: (item: INestedObject) =>
        item.id !== data.id && !isChild(item.id, data.id),
      drop: (drag: INestedObject) => onDrop(drag),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  useEffect(() => {
    if (isOver) onDebounce(data.id);
    else onDragLeave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOver]);

  return (
    <CardArea
      id={`label_${data.id}`}
      key={`label_${data.id}`}
      horizontal={!!prop.horizontal}
      className={'org-tree-node-label'}
      ref={drop}
      onClick={(e) =>
        typeof prop.onClick === 'function' && prop.onClick(e, data)
      }
    >
      {renderCard ? (
        <RenderCarPersonal key={`label_inner_${data.id}`} ref={drag}>
          {renderCard({
            isDragging,
            label,
            labelId: `label_text_${data.id}`,
            data,
            isPreviewCard: !!mock,
          })}
          {prop.collapsable && !isLastNode(data, prop) && (
            <RenderBtn
              setExpand={setExpand}
              expand={expand}
              data={data}
              prop={prop}
            />
          )}
        </RenderCarPersonal>
      ) : (
        <RenderLabel
          key={`label_inner_${data.id}`}
          ref={drag}
          isDragging={isDragging}
          className={clx.join(' ')}
          style={{ ...prop.cardStyle, ...data.style }}
        >
          <StyledLabel id={`label_text_${data.id}`}>{label}</StyledLabel>
          {prop.collapsable && !isLastNode(data, prop) && (
            <RenderBtn
              setExpand={setExpand}
              expand={expand}
              data={data}
              prop={prop}
            />
          )}
        </RenderLabel>
      )}
    </CardArea>
  );
};
