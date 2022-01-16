import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import OrgTreeComponent, { useTree } from '../tree';
import { Button, ButtonGroup, Grid, Typography, withStyles } from '@material-ui/core';

const rootComponent = {
  id: 1,
  label: 'App',
  children: []
};

const DemoButton = withStyles({
  root: {
    backgroundColor: '#ff9800',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#f57c00',
      borderColor: '#f57c00',
      color: '#fff'
    }
  }
})(Button);

const SnapshotButton = withStyles({
  root: {
    backgroundColor: '#9c27b0',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#7b1fa2',
      borderColor: '#7b1fa2',
      color: '#fff'
    }
  }
})(Button);

export default function ComponentTree(props: any): any {
  let navigate = useNavigate();
  const { treeRef } = useTree();

  return (
    <Grid container spacing={2}>
      <Grid item xs={8} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography variant="h5">Component Tree</Typography>
            <OrgTreeComponent data={rootComponent} ref={treeRef} horizontal />
          </Grid>
        </Grid>
        <Grid item>
          <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            <Outlet />
            <DemoButton variant="outlined" onClick={() => navigate('demo')}>
              Start Demo
            </DemoButton>
            <SnapshotButton variant="outlined">Take Snapshot</SnapshotButton>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Grid>
  );
}
