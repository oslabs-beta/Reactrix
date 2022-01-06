import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function BottomAppBar() {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position='fixed' sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <Typography
            variant='overline'
            component='div'
            sx={{ fontWeight: 'bold' }}
          >
            Version Alpha: Use with caution! ⚠️
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
