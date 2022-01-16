import * as React from 'react';
import OrgTreeComponent, { useTree } from '../tree';
import { Button, Grid, Typography } from '@material-ui/core';

let rootComponent = {
  id: 1,
  label: 'App',
  children: []
};

export default function ComponentTree(props: any): any {
  const { treeRef } = useTree();

  return (
    <div>
      <Typography variant="h5">Component Tree</Typography>
      <OrgTreeComponent data={rootComponent} ref={treeRef} horizontal />
      <Button variant="outlined">Take Snapshot</Button>
    </div>
  );
}
