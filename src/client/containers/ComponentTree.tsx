import * as React from 'react';
import OrgTreeComponent, { useTree } from '../tree';
import { Grid, Typography } from '@material-ui/core';
import { useAppSelector } from '../hooks';
import { selectProfilerData } from '../slices/profilerSlice';

const rootComponent = {
  id: 1,
  label: 'App',
  children: []
};

export default function ComponentTree(props: any): any {
  const { treeRef } = useTree();

  return (
    <Grid container spacing={2}>
      <Grid item xs={8} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography variant="h6">Component Tree</Typography>
            <OrgTreeComponent data={rootComponent} ref={treeRef} horizontal />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
