import * as React from 'react';
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Link,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    title: {
      flexGrow: 1,
      color: 'white',
      fontWeight: 'bold',
    },
    navLinks: {
      marginLeft: theme.spacing(3),
    },
    link: {
      textDecoration: 'none',
      color: 'white',
      fontSize: '14px',
      marginLeft: theme.spacing(3),
    },
  })
);

export default function Navbar(): any {
  const classes = useStyles();
  return (
    <AppBar position='fixed' className={classes.appBar}>
      <CssBaseline />
      <Toolbar>
        <Typography variant='h4' className={classes.title}>
          Reactrix
        </Typography>
        <div className={classes.navLinks}>
          <Link href='/' className={classes.link}>
            Tutorial
          </Link>
          <Link href='/' className={classes.link}>
            Log out
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}
