import * as React from 'react';
import { Grid, Typography } from '@material-ui/core';

import OrgTreeComponent, { useTree } from '../tree';
import { useTreeContext } from './GridContainer';
import { useAppSelector } from '../hooks';
import { selectProfilerData } from '../slices/profilerSlice';

export default function ComponentTree(): any {
  const { treeRef } = useTree();
  console.log('this is Profiler Data', useAppSelector(selectProfilerData));
  const TreeContext = useTreeContext();
  const getTreeData = TreeContext[1];

  const rootComponent = {
    id: 1,
    label: 'App',
    children: []
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={8} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography variant="h6">Component Tree</Typography>
            <OrgTreeComponent data={rootComponent} ref={treeRef} getData={getTreeData} horizontal />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
