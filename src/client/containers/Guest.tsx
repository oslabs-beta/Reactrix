import React, { useState, useEffect, useContext } from 'react';
import { Box, createStyles, makeStyles } from '@material-ui/core';
import Navbar from '../components/Navbar';
import GridContainer from './GridContainer';
import ComponentLibrary from './ComponentLibrary';
import { response } from 'express';


import { UserContext } from '../contexts/UserContext';
import { json } from 'body-parser';

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

  const { user, setUser, reusableComponents, setReusableComponents } = useContext(UserContext);

  const [componentTreeData, setComponentTreeData] = useState<object>({});

  console.log('user',user)

  useEffect(() => {
    setReusableComponents((reusableComponents: any) => [...reusableComponents, componentDetails]);
  }, [componentDetails]);

  const getComponentTreeData = (data: any) => {
    setComponentTreeData(data);
  };
  
  const handleSetDetails = (label?: any, url?: any, state?: any, hook?: any, children?: any) => {
    function checkDuplicate(input: any) {
      let result;
      for (let i= 0; i< reusableComponents.length; i++){
        if (reusableComponents[i].label === input){
          alert('Component name already exists')
          return false;
        }
        result = true;
      }
      return result;
    }
    const check = checkDuplicate(label);
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
        <ComponentLibrary drawer={drawer} reusableComponents={reusableComponents}/>
        <GridContainer
          containerLeft={containerLeft}
          containerRight={containerRight}
          label={label}
          url={url}
          state={state}
          hook={hook}
          componentTreeData={componentTreeData}
          getComponentTreeData={getComponentTreeData}
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
