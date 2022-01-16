import React, { useState, useEffect } from 'react';
import { Box, createStyles, makeStyles } from '@material-ui/core';

import Navbar from '../components/Navbar';
import GridContainer from './GridContainer';
import ComponentLibrary from './ComponentLibrary';

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

export default function Main() {
  const { drawer, containerLeft, containerRight } = useStyles();

  // const [id, setId] = useState('');
  const [label, setLabel] = useState('');
  const [url, setUrl] = useState('');
  const [state, setState] = useState('');
  const [hook, setHook] = useState('');
  const [componentDetails, setComponentDetails] = useState({
    id: '1',
    label: 'App',
    url: '',
    state: '',
    hook: '',
    children: []
  });
  const [reusableComponents, setReusableComponents] = useState<Array<any>>([]);

  useEffect(() => {
    setReusableComponents((reusableComponents) => [...reusableComponents, componentDetails]);
  }, [componentDetails]);

  const handleSetDetails = (label?: any, url?: any, state?: any, hook?: any, children?: any) => {
    if (label) {
      const newComponentDetails = {
        ...componentDetails,
        label: label,
        url: url,
        state: state,
        hook: hook,
        children: children
      };
      setComponentDetails(newComponentDetails);
    } else {
      return;
    }
  };

  // const handleAddToReusableComponents = (component: any) => {
  //     setReusableComponents((reusableComponents) => [...reusableComponents, component]);
  // };

  // TODO: event handlers below are currently triggering re-renders of whole app
  const handleOnChangeLabel = (event: any) => {
    setLabel(event.target.value);
  };

  const handleOnChangeUrl = (event: any) => {
    setUrl(event.target.value);
  };

  const handleOnChangeState = (event: any) => {
    setState(event.target.value);
  };

  const handleOnChangeHook = (event: any) => {
    setHook(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <Box sx={{ display: 'flex' }}>
        <ComponentLibrary drawer={drawer} reusableComponents={reusableComponents} />
        <GridContainer
          containerLeft={containerLeft}
          containerRight={containerRight}
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
      </Box>
    </div>
  );
}
