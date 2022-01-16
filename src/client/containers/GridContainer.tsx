import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Toolbar } from '@material-ui/core';
import PerformanceMetrics from '../components/PerformanceMetrics';
import ComponentDetails from '../components/ComponentDetails';
import Snapshots from '../components/Snapshots';
import { handleInitialData, handleUpdateData } from '../helpers/helpers';
// import { ContextType } from '../Main';

const GridContainer = (props: any) => {
  const { containerLeft, containerRight, label, url, state, hook, handleSetDetails, handleOnChangeLabel, handleOnChangeUrl, handleOnChangeState, handleOnChangeHook } = props;
  // let navigate = useNavigate();

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

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 2.5 }}>
      <Toolbar />
      <Grid container spacing={4}>
        <Grid item xs={8} className={containerLeft}>
          {/* Outlet defaults to component tree, but changes to demo app on button click */}
          <Outlet />
        </Grid>
        <Grid item xs={4} className={containerRight}>
          <ComponentDetails
            label={label}
            url={url}
            state={state}
            hook={hook}
            handleSetDetails={handleSetDetails}
            handleOnChangeLabel={handleOnChangeLabel}
            handleOnChangeUrl={handleOnChangeUrl}
            handleOnChangeState={handleOnChangeState}
            handleOnChangeHook={handleOnChangeHook}
          />
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
