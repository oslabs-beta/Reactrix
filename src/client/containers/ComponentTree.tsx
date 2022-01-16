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
    backgroundColor: '#b3e5fc',
    color: '#000',
    '&:hover': {
      backgroundColor: '#29b6f6',
      borderColor: '#29b6f6',
      color: '#000'
    }
  }
})(Button);

const SnapshotButton = withStyles({
  root: {
    backgroundColor: '#2196f3',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#1565c0',
      borderColor: '#1565c0',
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
            <Typography variant="h6">Component Tree</Typography>
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
