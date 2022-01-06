import React from 'react';
import { useDrop } from 'react-dnd';
import OrgTreeComponent, { useTree } from '../tree';
import { INestedObject } from '../tree/interfaces';

let data = {
  id: 1,
  label: 'App',
  children: [],
};

export default function ComponentTree(props: any): any {
  // const [collectedProps, drop] = useDrop(() => ({
  //   accept: 'box',
  //   drop: (item: INestedObject, monitor) => {
  //     console.log(treeRef.current?.addChildrenById(treeRef.current.data.id,[item]));
  //   },
  //   collect: (monitor) => ({
  //     isOver: !!monitor.isOver(),
  //   }),
  // }));
  const { treeRef } = useTree();

  // console.log('this is treeRef.current', treeRef.current);

  return (
    <div>
      {/* <div ref={drop}> */}
      <div>
        <OrgTreeComponent data={data} ref={treeRef} horizontal />
      </div>
      {/* </div> */}
    </div>
  );
}
