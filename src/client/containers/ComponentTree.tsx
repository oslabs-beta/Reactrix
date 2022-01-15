import * as React from 'react';
import OrgTreeComponent, { useTree } from '../tree';

let data = {
  id: 1,
  label: 'App',
  children: [],
};

export default function ComponentTree(props: any): any {
  const { treeRef } = useTree();

  return (
    <div>
        <OrgTreeComponent data={data} ref={treeRef} horizontal />
    </div>
  );
}
