import * as React from 'react';
import OrgTreeComponent, { useTree } from '../tree';
import { Button, Typography } from '@material-ui/core';

let data = {
  id: 1,
  label: 'App',
  children: []
};

export default function ComponentTree(props: any): any {
  const { treeRef } = useTree();

  return (
    <div>
      <Typography variant="h5">Component Tree</Typography>
      <OrgTreeComponent data={data} ref={treeRef} horizontal />
      <Button variant="outlined">Take Snapshot</Button>
    </div>
  );
}
