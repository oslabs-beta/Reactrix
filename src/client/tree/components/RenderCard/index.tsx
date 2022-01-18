import * as React from 'react';
import { useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { nanoid } from 'nanoid';

import { isLastNode } from '..';
import { useHierarchyData } from '../../context/HierarchyContextProvider';
import { useDebounce } from '../../hooks/useDebounce';
import { INestedObject } from '../../../../interfaces';
import { IRenderCard } from '../interfaces';
import { RenderBtn } from '../RenderBtn';
import { CardArea, RenderLabel, StyledLabel, RenderCardPersonal } from './styles';

export const RenderCard = ({ data, setExpand, expand, prop: { renderCard, ...prop } }: IRenderCard) => {
  const { setHierarchy, hierarchyRef, addChildrenById, editById, isChild, findParentByChildId, findById, draggingItemRef } = useHierarchyData();

  const node = prop.node;
  const label = data[node.label];
  const clx = ['org-tree-node-label-inner'];
  const getHierarchyTreeData = prop.getData;

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'box',
      item: data,
      options: {
        dropEffect: 'copy'
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      })
    }),
    []
  );

  useEffect(() => {
    const labelDoc = document.getElementById(`node-tree-${data.id}`);
    if (!labelDoc) return;

    // labelDoc.style.opacity = isDragging ? '0.5' : '1';

    const LabelClassName = labelDoc.className;

    labelDoc.className = isDragging ? labelDoc.className + ' RdtCant-drop' : LabelClassName.replace(' RdtCant-drop', '');

    draggingItemRef.current = data;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  const onDragEnter = (dropId: string | number) => {
    let dragLabel = 'Copy here';
    if (draggingItemRef.current) {
      const dragItemId = draggingItemRef.current.id;
      // const dragItemLabel = draggingItemRef.current.label;
      const canDrop = dragItemId !== data.id && !isChild(dragItemId, data.id);
      dragLabel = draggingItemRef.current.label;
      if (!canDrop) return;
    }
  };

  const onDrop = (drag: INestedObject) => {
    const dragItem = findById(drag.id); // returns null if id is not found

    // grab details for the item currently begin dragged to component tree
    const { label, url, state, hook } = drag;
    const dropItem = data;

    // finds original parent of the drag item if the drag item already existed
    const { parent: parentDragItem } = findParentByChildId(drag.id);

    // if drag item already exists, update Hierarchy
    if (parentDragItem && dragItem) {
      const newParent = {
        ...parentDragItem,
        children: [...parentDragItem.children.filter((i) => i.id !== drag.id)]
      };

      const removedDragItemHierarchy = editById(parentDragItem.id, newParent, 'replace');

      const addedDragItemHierarchy = editById(
        dropItem.id,
        {
          children: [dragItem]
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
          id: nanoid(),
          label: label,
          url: url,
          state: state,
          hook: hook,
          children: []
        }
      ]);

      // update context with new DragItemHierarchy
      setHierarchy(addedNewDragItemHierarchy);
      console.log('hierarchyRef logged from rendercard', hierarchyRef.current);
      hierarchyRef.current = addedNewDragItemHierarchy;
    }

    // send current hierachy tree object back to main component to be passed to children that require the data
    getHierarchyTreeData(hierarchyRef.current);
  };

  const { onDebounce } = useDebounce(onDragEnter, 300);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'box',
      canDrop: (item: INestedObject) => item.id !== data.id && !isChild(item.id, data.id),
      drop: (drag: INestedObject) => onDrop(drag),
      collect: (monitor) => ({
        isOver: !!monitor.isOver()
      })
    }),
    []
  );

  useEffect(() => {
    if (isOver) {
      onDebounce(data.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOver]);

  return (
    <CardArea
      id={`label_${data.id}`}
      key={`label_${data.id}`}
      horizontal={!!prop.horizontal}
      className={'org-tree-node-label'}
      ref={drop}
      onClick={(e) => typeof prop.onClick === 'function' && prop.onClick(e, data)}
    >
      {renderCard ? (
        <RenderCardPersonal key={`label_inner_${data.id}`} ref={drag}>
          {renderCard({
            isDragging,
            label,
            labelId: `label_text_${data.id}`,
            data
          })}
          {prop.collapsable && !isLastNode(data, prop) && <RenderBtn setExpand={setExpand} expand={expand} data={data} prop={prop} />}
        </RenderCardPersonal>
      ) : (
        <RenderLabel key={`label_inner_${data.id}`} ref={drag} isDragging={isDragging} className={clx.join(' ')} style={{ ...prop.cardStyle, ...data.style }}>
          <StyledLabel id={`label_text_${data.id}`}>{label}</StyledLabel>
          {prop.collapsable && !isLastNode(data, prop) && <RenderBtn setExpand={setExpand} expand={expand} data={data} prop={prop} />}
        </RenderLabel>
      )}
    </CardArea>
  );
};
