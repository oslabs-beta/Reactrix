import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import OrgTreeComponent, { useTree } from '../tree';
import { Button, ButtonGroup, Grid, Typography, withStyles } from '@material-ui/core';

const rootComponent = {
  id: 1,
  label: 'App',
  children: []
};

const ComponentTreeButton = withStyles({
  root: {
    backgroundColor: '#ffca28',
    color: '#000',
    '&:hover': {
      backgroundColor: '#ffb300',
      borderColor: '#ffb300',
      color: '#000'
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
            <ComponentTreeButton variant="outlined" onClick={() => navigate('demo')}>
              Start Demo
            </ComponentTreeButton>
            <ComponentTreeButton variant="outlined">Take Snapshot</ComponentTreeButton>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Grid>
  );
}
