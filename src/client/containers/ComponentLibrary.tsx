import React, { useState, useEffect, useContext } from 'react';
import { Box, Drawer, List, ListItem, Toolbar, Typography, Divider } from '@material-ui/core';
import Button, { ButtonProps } from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { grey, lightBlue } from '@mui/material/colors';
import NewComponent from '../components/NewComponent';
import ReusableComponents from './ReusableComponents';

const DeleteButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(grey[800]),
  backgroundColor: lightBlue[900],
  '&:hover': {
    backgroundColor: grey[300]
  }
}));

export default function ComponentLibrary(props: any): any {
  const { reusableComponents, handleDeleteReusableComponents } = props;

  return (
    <Drawer variant="permanent" className={props.drawer}>
      <Box sx={{ overflow: 'auto' }}>
        <Toolbar />
        <List>
          <ListItem>
            <Typography variant="h6">Component Library</Typography>
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
          <ReusableComponents reusableComponents={reusableComponents} />
          <DeleteButton onClick={ () => {
            let deletingComponent = window.prompt('Which one would you like to delete?', `${reusableComponents[1].label}`);
            handleDeleteReusableComponents(deletingComponent)
          }}> Delete </DeleteButton> 
        </List>
      </Box>
    </Drawer>
  );
}
