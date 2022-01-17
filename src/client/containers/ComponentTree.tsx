import * as React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useAppSelector } from '../hooks';
import { selectProfilerData } from '../slices/profilerSlice';

import OrgTreeComponent, { useTree } from '../tree';
import { useTreeContext } from './GridContainer';

export default function ComponentTree(): any {
  const { treeRef } = useTree();
  const TreeContext = useTreeContext();

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
            <OrgTreeComponent data={rootComponent} ref={treeRef} getData={TreeContext[1]} horizontal />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
