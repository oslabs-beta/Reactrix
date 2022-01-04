import * as React from 'react';
import { useDrag } from 'react-dnd';
import {
  Box,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';

import ComponentTree from './ComponentTree';
import NewComponent from '../components/NewComponent';
import ReusableComponents from './ReusableComponents';
import PerformanceMetrics from './PerformanceMetrics';

import OrgTreeComponent, { useTree } from '../tree';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: 300,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: 300, boxSizing: 'border-box' },
    },
    container: {
      width: '50%',
      height: '500px',
      minWidth: '750px',
      borderBottom: '0.5px Solid lightgrey',
      borderRight: '0.5px Solid lightgrey',
    },
  })
);

export default function ComponentLibrary(): any {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: 'box',
    item: { id: 1 },
  }));

  // make a OrgTreeComponent for New Component
  const { treeRef } = useTree();
  const data = {
    id: 777,
    label: 'New Component',
    children: [],
  };

  const classes = useStyles();

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer variant='permanent' className={classes.drawer}>
        <Box sx={{ overflow: 'auto' }}>
          <Toolbar />
          <List>
            <ListItem>
              <ListItemText>
                <Typography variant='h5'>Component Library</Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <NewComponent />
              {/* <TreeNode horizontal={true}
              node={{
                label: 'label',
                expand: 'expand',
                children: 'children',
              }}
              collapsable={true}
              expandAll={expandAllNodes}
              onClick={(e, nodeData) => onClick && onClick(e, nodeData)}
              {...props}/> */}
              {/* <OrgTreeComponent data={data} ref={treeRef} horizontal /> */}
            </ListItem>
          </List>
          <List>
            <Divider />
            <ListItem>
              <ListItemText>
                <Typography variant='subtitle1'>Reusable Components</Typography>
              </ListItemText>
            </ListItem>
            <ReusableComponents />
          </List>
        </Box>
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, p: 2.5 }}>
        <Toolbar />
        <Grid container spacing={2}>
          <Grid item className={classes.container}>
            <Typography variant='h5'>Component Tree</Typography>
            <ComponentTree />
          </Grid>
          <Grid item className={classes.container}>
            <Typography variant='h5'>Component Details</Typography>
          </Grid>
          <Grid item className={classes.container}>
            <Typography variant='h5'>Performance Metrics</Typography>
            <PerformanceMetrics />
          </Grid>
          <Grid item className={classes.container}>
            <Typography variant='h5'>Snapshots</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
