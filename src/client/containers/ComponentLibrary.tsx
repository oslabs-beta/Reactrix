import React from 'react';
import { Box, Drawer, List, ListItem, Toolbar, Typography, Divider } from '@material-ui/core';

import NewComponent from '../components/NewComponent';
import ReusableComponents from './ReusableComponents';

export default function ComponentLibrary(props: any): any {
  const { reusableComponents,handleDeleteComponent } = props;

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
          <ReusableComponents reusableComponents={reusableComponents} handleDeleteComponent={handleDeleteComponent} />
        </List>
      </Box>
    </Drawer>
  );
}
