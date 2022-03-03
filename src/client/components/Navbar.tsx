import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { AppBar, Toolbar, CssBaseline, Typography, createStyles, makeStyles, Theme } from '@material-ui/core';
import { Navigate, useNavigate } from 'react-router-dom';
import { truncateSync } from 'fs';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    title: {
      flexGrow: 1,
      color: 'white',
      fontWeight: 'bold',
      marginLeft: theme.spacing(-1)
    },
    logo: {
      color: 'white'
    },
    navLinks: {
      marginLeft: theme.spacing(3)
    },
    link: {
      textDecoration: 'none',
      color: 'black',
      fontSize: '14px',
      marginLeft: theme.spacing(3)
    }
  })
);

export default function Navbar(): any {

  const classes = useStyles();
  let { user, setUser }: any = useContext(UserContext);
  let navigate = useNavigate();
  const logOut = async () => {
    await fetch('/auth/logout', {
    method: 'POST',
    })
    .then((data) => {
      return data.json();
    })
    .then((response) => {
      setUser(null);
      navigate('/', { replace: true })
    })
    .catch((err) => {
      console.log('error from main page', err);
    });
  }

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <CssBaseline />
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          Reactrix
        </Typography>
        <div className={classes.navLinks}>
          <button onClick={() => logOut()} className={classes.link}>
            SignOut
          </button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
function redirect() {
  throw new Error('Function not implemented.');
}

