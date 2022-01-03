import * as React from 'react';
import {
  Box,
  Button,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
  Divider,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import ComponentTree from './ComponentTree';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: 290,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: 290, boxSizing: 'border-box' },
    },
  })
);

export default function ComponentLibrary(): any {
  const classes = useStyles();
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer variant='permanent' className={classes.drawer}>
        <Box sx={{ overflow: 'auto' }}>
          <Toolbar />
          <List>
            <ListItem>
              <ListItemText>
                <Typography variant='h5'>Component Library</Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <Button variant='outlined' size='small' key='New Component'>
                New Component
              </Button>
            </ListItem>
          </List>
          <List>
            <Divider />
            <ListItem>
              <ListItemText>
                <Typography variant='subtitle1'>Reusable Components</Typography>
              </ListItemText>
            </ListItem>
            {[
              'Container Component 1',
              'Container Component 2',
              'Presentational Component 1',
              'Presentational Component 2',
              'Presentational Component 3',
            ].map((text, index) => (
              <ListItem>
                <Button variant='outlined' size='small' key={index}>
                  {text}
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <ComponentTree />
      </Box>
    </Box>
  );
}
