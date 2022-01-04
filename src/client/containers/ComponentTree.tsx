
import * as React from 'react';
import { useDrop } from 'react-dnd';
import OrgTreeComponent, { useTree } from 'react-drag-hierarchy-tree';
import { INestedObject } from 'react-drag-hierarchy-tree/src/interfaces';

let data = {
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
    accept: 'box',
    drop: (item: INestedObject, monitor) => {
      console.log(treeRef.current?.addChildrenById(treeRef.current.data.id,[item]));
      // return treeRef.current?.addChildrenById(treeRef.current.data.id,[item]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const { treeRef } = useTree();
  
  // console.log('this is treeRef.current', treeRef.current);


  return (
    <div>
      <div ref={drop}>
        <div>
          <OrgTreeComponent data={data} ref={treeRef} horizontal />
        </div>
      </div>
    </div>
  );
}
