<<<<<<< HEAD
import React, { useState } from 'react';
import { Box, Drawer, Grid, List, ListItem, ListItemText, Toolbar, Typography, Divider, createStyles, makeStyles } from '@material-ui/core';
=======
import React from 'react';

import {
  Box,
  Drawer,
  List,
  ListItem,
  Toolbar,
  Typography,
  Divider,
} from '@material-ui/core';
>>>>>>> dev

import NewComponent from '../components/NewComponent';
import ReusableComponents from './ReusableComponents';
<<<<<<< HEAD
import PerformanceMetrics from './PerformanceMetrics';
import ComponentDetails from './ComponentDetails';
import Snapshots from './Snapshots';
import { handleInitialData, handleUpdateData } from '../helpers/helpers';

const useStyles = makeStyles(() =>
    createStyles({
        drawer: {
            width: 300,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 300, boxSizing: 'border-box' }
        },
        containerLeft: {
            height: 'auto',
            borderBottom: '0.5px Solid lightgrey',
            borderRight: '0.5px Solid lightgrey'
        },
        containerRight: {
            height: 'auto',
            borderBottom: '0.5px Solid lightgrey'
        }
    })
);

export default function ComponentLibrary(): any {
    const [firstSnapshot, setFirstSnapshot] = useState(true);
    const [checked, setChecked] = useState(false);

    function handleFirstCheck() {
        setFirstSnapshot(!firstSnapshot);
    }

    function handleCheck() {
        setChecked(!checked);
    }

    if (checked) {
        const newDummyData = handleUpdateData();
    }

    const classes = useStyles();

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer variant="permanent" className={classes.drawer}>
                <Box sx={{ overflow: 'auto' }}>
                    <Toolbar />
                    <List>
                        <ListItem>
                            <ListItemText>
                                <Typography variant="h5">Component Library</Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <NewComponent label="New Component" />
                        </ListItem>
                    </List>
                    <List>
                        <Divider />
                        <ListItem>
                            <ListItemText>
                                <Typography variant="subtitle1">Reusable Components</Typography>
                            </ListItemText>
                        </ListItem>
                        <ReusableComponents />
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 2.5 }}>
                <Toolbar />
                <Grid container spacing={4}>
                    <Grid item xs={8} className={classes.containerLeft}>
                        <Typography variant="h5">Component Tree</Typography>
                        <ComponentTree />
                    </Grid>
                    <Grid item xs={4} className={classes.containerRight}>
                        <Typography variant="h5">Component Details</Typography>
                        <ComponentDetails />
                    </Grid>
                    <Grid item xs={8} className={classes.containerLeft}>
                        <Typography variant="h5">Performance Metrics</Typography>
                        <PerformanceMetrics checked={checked} firstSnapshot={firstSnapshot} handleCheck={handleCheck} />
                    </Grid>
                    <Grid item xs={4} className={classes.containerRight}>
                        <Typography variant="h5">Snapshots</Typography>
                        <Snapshots handleCheck={handleCheck} handleFirstCheck={handleFirstCheck} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
=======

export default function ComponentLibrary(props: any): any {

  return (
      <Drawer variant="permanent" className={props.drawer}>
        <Box sx={{ overflow: 'auto' }}>
          <Toolbar />
          <List>
            <ListItem>
                <Typography variant="h5">Component Library</Typography>
            </ListItem>
            <ListItem>
              <NewComponent label="New Component" />
            </ListItem>
          </List>
          <List>
            <Divider />
            <ListItem>
                <Typography variant="subtitle1">Reusable Components</Typography>
            </ListItem>
            <ReusableComponents />
          </List>
        </Box>
      </Drawer>
  );
>>>>>>> dev
}
