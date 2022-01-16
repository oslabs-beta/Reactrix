import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { AppBar, Toolbar, CssBaseline, Typography, createStyles, makeStyles, Theme } from '@material-ui/core';
import { Link } from 'react-router-dom';
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
      color: 'white',
      fontSize: '14px',
      marginLeft: theme.spacing(3)
    }
  })
);

export default function Navbar(): any {
  const classes = useStyles();
  let { user, setUser }: any = useContext(UserContext);
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.title}>
          Reactrix
        </Typography>
        <div className={classes.navLinks}>
          <Link to="/" onClick={() => setUser(null)} className={classes.link}>
            {'Log out'}
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}
