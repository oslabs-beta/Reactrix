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
    title: {
      flexGrow: 1,
      color: 'white',
    },
    navLinks: {
      marginLeft: theme.spacing(10),
      display: 'flex',
    },
    link: {
      textDecoration: 'none',
      color: 'white',
      fontSize: '20px',
      marginLeft: theme.spacing(5),
      '&:hover': {
        borderBottom: '0px solid white',
      },
    },
  })
);

export default function Navbar(): any {
  const classes = useStyles();
  return (
    <AppBar position='static'>
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
