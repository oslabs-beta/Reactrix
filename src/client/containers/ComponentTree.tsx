import * as React from 'react';
import { useDrop } from 'react-dnd';
import OrgTreeComponent, { useTree } from 'react-drag-hierarchy-tree';

const data = {
  id: 1,
  label: 'App',
  children: [
    {
      id: 2,
      label: 'Container 1',
      children: [
        {
          id: 3,
          label: 'Container 2',
          children: [
            {
              id: 5,
              label: 'Child 1',
              children: [
                {
                  id: 6,
                  label: 'Child 2',
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 4,
      label: 'Container 3',
      children: [
        {
          id: 7,
          label: 'Child 3',
          children: [],
        },
      ],
    },
  ],
};

export default function ComponentTree(props: any): any {
  const [collectedProps, drop] = useDrop(() => ({
    accept: 'BOX',
    drop: (item, monitor) => props.dragHandler(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const { treeRef } = useTree();
  return (
    <div>
      <div ref={drop}></div>
      <div>
        <OrgTreeComponent data={data} ref={treeRef} horizontal />
      </div>
    </div>
  );
}
