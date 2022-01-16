import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Button, ButtonGroup, Grid, Toolbar, withStyles } from '@material-ui/core';
import PerformanceMetrics from '../components/PerformanceMetrics';
import ComponentDetails from '../components/ComponentDetails';
import Snapshots from '../components/Snapshots';
import { handleInitialData, handleUpdateData } from '../helpers/helpers';

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

const GridContainer = (props: any) => {
  const { containerLeft, containerRight, label, url, state, hook, handleSetDetails, handleOnChangeLabel, handleOnChangeUrl, handleOnChangeState, handleOnChangeHook } = props;
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
  }

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
      <Toolbar />
      <Grid container spacing={4}>
        <Grid item xs={8} className={containerLeft}>
          <Outlet />
          <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            <DemoButton variant="outlined" onClick={handleProfiling}>
              Start Demo
            </DemoButton>
            <SnapshotButton variant="outlined">Take Snapshot</SnapshotButton>
          </ButtonGroup>
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
