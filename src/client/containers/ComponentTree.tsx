import * as React from 'react';
import OrgTreeComponent, { useTree } from '../tree';
import { useTreeContext } from './GridContainer';
import { Grid, Typography } from '@material-ui/core';

const rootComponent = {
  id: 1,
  label: 'App',
  children: []
};

export default function ComponentTree(props: any): any {
  const { treeRef } = useTree();
  const TreeData = useTreeContext();

  return (
    <Grid container spacing={2}>
      <Grid item xs={8} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography variant="h6">Component Tree</Typography>
            <OrgTreeComponent data={rootComponent} ref={treeRef} getData={TreeData} horizontal />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
