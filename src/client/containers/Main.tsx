import React, { useState, useEffect, useContext } from 'react';
import { Box, createStyles, makeStyles } from '@material-ui/core';

import Navbar from '../components/Navbar';
import GridContainer from './GridContainer';
import ComponentLibrary from './ComponentLibrary';
import { response } from 'express';


import { UserContext } from '../contexts/UserContext';

const useStyles = makeStyles(() =>
  createStyles({
    drawer: {
      width: 280,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: 280, boxSizing: 'border-box' }
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
  let { reusableComponents, setReusableComponents } = useContext(UserContext);

  // const [reusableComponents, setReusableComponents] = useState<Array<any>>([]);
  
  useEffect(() => {
    console.log('Main useEffect line 52', componentDetails)

    setReusableComponents((reusableComponents: any) => [...reusableComponents, componentDetails]);
  }, [componentDetails]);

  // useEffect(() => {
  //   setReusableComponents((reusableComponents) => [...reusableComponents, componentDetails]);
  // }, [componentDetails]);

  const handleSetDetails = (label?: any, url?: any, state?: any, hook?: any, children?: any) => {
    console.log('Main.tsx', reusableComponents);
    function checkDuplicate(input: string) {
      console.log(input)
      let result;
      for (let i= 0; i< reusableComponents.length; i++){
        if (reusableComponents[i].label === input){
          alert('The component name cannot be a duplicate')
          return false;

        }
        console.log('youre good')
        result = true;
      }
      return result;
    }
    const check = checkDuplicate(label);
    console.log(check);
    if (label && check) {
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
