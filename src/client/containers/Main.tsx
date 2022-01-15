import React from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import {
    Box,
    createStyles,
    makeStyles,
} from '@material-ui/core';

import Navbar from '../components/Navbar';
import GridContainer from './GridContainer';
import ComponentLibrary from './ComponentLibrary';

const useStyles = makeStyles(() =>
  createStyles({
    drawer: {
      width: 300,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: 300, boxSizing: 'border-box' },
    },
    containerLeft: {
      height: 'auto',
      borderBottom: '0.5px Solid lightgrey',
      borderRight: '0.5px Solid lightgrey',
    },
    containerRight: {
      height: 'auto',
      borderBottom: '0.5px Solid lightgrey',
    },
  })
);

const Main = () => {
  const { drawer, containerLeft, containerRight} = useStyles();
  return (
    <div>
      <Navbar />
      <Box sx={{ display: 'flex' }}>
        <ComponentLibrary drawer={drawer}/>
        <GridContainer containerLeft={containerLeft} containerRight={containerRight}/>
      </Box>
    </div>
  );
};

export default Main;
