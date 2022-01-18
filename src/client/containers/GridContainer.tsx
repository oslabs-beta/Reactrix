import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import { Box, Button, ButtonGroup, Grid, Toolbar, withStyles } from '@material-ui/core';

import { ITreeContext } from '../../interfaces/index';
import PerformanceMetrics from '../components/PerformanceMetrics';
import ComponentDetails from '../components/ComponentDetails';
import Snapshots from './Snapshots';
import { handleInitialData, handleUpdateData } from '../helpers/helpers';
import { useAppDispatch } from '../hooks';

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

export default function GridContainer(props: any) {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    containerLeft,
    containerRight,
    label,
    url,
    state,
    hook,
    componentTreeData,
    getComponentTreeData,
    handleSetDetails,
    handleOnChangeLabel,
    handleOnChangeUrl,
    handleOnChangeState,
    handleOnChangeHook
  } = props;

  const [allSnapshots, setAllSnapshots] = useState<Array<any>>([]);
  const [newSnapshot, setNewSnapshot] = useState({});

  const [isProfiling, setIsProfiling] = useState<boolean>(false);
  const [startStop, setStartStop] = useState('Start');

  useEffect(() => {
    setAllSnapshots((allSnapshots) => [...allSnapshots, newSnapshot]);
  }, [newSnapshot]);

  const handleNewSnapshot = (currentTree: any) => {
    setNewSnapshot(currentTree);
  };

  const handleProfiling = () => {
    if (!isProfiling) {
      setIsProfiling(true);
      setStartStop('Stop');
      navigate('demo');
    } else {
      setIsProfiling(false);
      dispatch({ type: 'profiler/clearProfilerData' });
      setStartStop('Start');
      navigate('');
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
      <Toolbar />
      <Grid container spacing={4}>
        <Grid item xs={8} className={containerLeft}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Outlet context={[componentTreeData, getComponentTreeData]} />
              </Grid>
            </Grid>
            <Grid item>
              <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                <DemoButton variant="outlined" onClick={handleProfiling}>
                  {`${startStop} Profiling`}
                </DemoButton>
                <SnapshotButton variant="outlined" onClick={() => handleNewSnapshot(componentTreeData)}>
                  Take Snapshot
                </SnapshotButton>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} className={containerRight}>
          <ComponentDetails
            label={label}
            url={url}
            state={state}
            hook={hook}
            componentTreeData={componentTreeData}
            handleSetDetails={handleSetDetails}
            handleOnChangeLabel={handleOnChangeLabel}
            handleOnChangeUrl={handleOnChangeUrl}
            handleOnChangeState={handleOnChangeState}
            handleOnChangeHook={handleOnChangeHook}
          />
        </Grid>
        <Grid item xs={8} className={containerLeft}>
          <PerformanceMetrics />
        </Grid>
        <Grid item xs={4} className={containerRight}>
          <Snapshots allSnapshots={allSnapshots} />
        </Grid>
      </Grid>
    </Box>
  );
}

export function useTreeContext() {
  return useOutletContext<ITreeContext>();
}
