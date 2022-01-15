import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Grid,
    Toolbar,
} from '@material-ui/core';
import PerformanceMetrics from '../components/PerformanceMetrics';
import ComponentDetails from '../components/ComponentDetails';
import Snapshots from '../components/Snapshots';
import { handleInitialData, handleUpdateData } from '../helpers/helpers';

const GridContainer = (props: any) => {
  const {containerLeft, containerRight} = props;
  let navigate = useNavigate();
  const [firstSnapshot, setFirstSnapshot] = useState(true);
  const [checked, setChecked] = useState(false);
  const [isProfiling, setIsProfiling] = useState<boolean>(false);

  function handleFirstCheck() {
    setFirstSnapshot(!firstSnapshot);
  }

  function handleCheck() {
    setChecked(!checked);
  }

  function handleProfiling() {
    if (!isProfiling) {
      setIsProfiling(true);
      navigate('demo');
    } else {
      setIsProfiling(false);
      navigate('');
    }
  }

  if (checked) {
    const newDummyData = handleUpdateData();
    console.log(
      'this is dummydata, it should be updating with every truthy return of check',
      newDummyData
    );
  }

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 2.5 }}>
        <Toolbar />
        <Grid container spacing={4}>
          <Grid item xs={8} className={containerLeft}>
            <Outlet />
            <Button type="submit" variant="contained" onClick={handleProfiling}>
              Demo
            </Button>
          </Grid>
          <Grid item xs={4} className={containerRight}>
            <ComponentDetails />
          </Grid>
          <Grid item xs={8} className={containerLeft}>
            <PerformanceMetrics checked={checked} firstSnapshot={firstSnapshot} handleCheck={handleCheck} />
          </Grid>
          <Grid item xs={4} className={containerRight}>
            <Snapshots handleCheck={handleCheck} handleFirstCheck={handleFirstCheck} />
          </Grid>
        </Grid>
      </Box>
    );
};

export default GridContainer;
