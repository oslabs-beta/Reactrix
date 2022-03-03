import React, { useState, useEffect, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';

import Button, { ButtonProps } from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import GitHubIcon from '@material-ui/icons/GitHub';
import { UserContext } from '../contexts/UserContext';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(grey[800]),
  backgroundColor: grey[800],
  '&:hover': {
    backgroundColor: grey[700]
  }
}));

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Reactrix'} {new Date().getFullYear()}
    </Typography>
  );
}

export default function SignIn() {

  let { user, setUser, reusableComponents, setReusableComponents } = useContext(UserContext);

  const oAuth = () => {
    // initiate the authentication
    window.open('http://localhost:3000/auth/github', '_self');
    };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'background.paper',
          minWidth: 400,
          marginTop: 18,
          p: 5,
          boxShadow: 3,
          borderRadius: 2
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            flexWrap: 'wrap'
          }}
        >
          <Typography component="h1" variant="h3" sx={{ fontWeight: 700, marginBottom: 2, p: 1 }}>
            Reactrix
          </Typography>
        </div>

        <ColorButton type="submit" variant="contained" size="large" sx={{ mt: 3, mb: 6, minHeight: '60px' }} onClick={oAuth}>
          <GitHubIcon />
          {'\u00A0\u00A0Login with GitHub'}
        </ColorButton>

        <Grid item>
          <Link className="signin" to="/guest" >
            {'Continue as Guest'}
          </Link>
        </Grid>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
