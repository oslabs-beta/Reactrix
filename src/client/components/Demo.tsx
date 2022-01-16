import React from 'react';
import axios from 'axios';
import { Box, Button, ButtonGroup, Card, CardActions, CardContent, Grid, Typography, withStyles } from '@material-ui/core';

const DemoButton = withStyles({
  root: {
    backgroundColor: '#ff9800',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#f57c00',
      borderColor: '#f57c00',
      color: '#fff'
    }
  }
})(Button);

const SnapshotButton = withStyles({
  root: {
    backgroundColor: '#9c27b0',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#7b1fa2',
      borderColor: '#7b1fa2',
      color: '#fff'
    }
  }
})(Button);

export default function Demo(props: any) {
  const handleRequest = (url: string) => {
    axios.get(`${url}`).then((res) => console.log(res));
  };

  const formatComponentName = (name: string) => {
    if (name) {
      let removeSpaces = name.replace(/\s+/g, '');
      const formattedName = removeSpaces.charAt(0).toUpperCase() + removeSpaces.slice(1);
      return formattedName;
    }
    return;
  };

  const emptyCard = (
    <React.Fragment>
      <CardContent>
        <Typography variant="caption">Default Empty Component</Typography>
        <Typography variant="h3">Name: </Typography>
      </CardContent>
      <CardActions></CardActions>
    </React.Fragment>
  );

  // const detailCard = (
  //   <React.Fragment>
  //     <CardContent>
  //       <Typography variant="h3">Name: {formatComponentName(label)}</Typography>
  //     </CardContent>
  //     <CardActions>
  //       {url ? (
  //         <Button
  //           variant="outlined"
  //           size="small"
  //           onClick={() => {
  //             handleRequest(url);
  //           }}
  //         >
  //           API Call
  //         </Button>
  //       ) : null}
  //       {state ? <Typography variant="body2">State: {state}</Typography> : null}
  //       {hook ? <Typography variant="body2">Hook: {hook}</Typography> : null}
  //     </CardActions>
  //   </React.Fragment>
  // );

  return (
    <Grid container spacing={2}>
      <Grid item xs={8} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography variant="h5">Demo</Typography>
            <Box sx={{ minWidth: 275, maxWidth: 550 }}>
              <Card variant="outlined">{emptyCard}</Card>
            </Box>
          </Grid>
        </Grid>
        <Grid item>
          <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            <DemoButton variant="outlined">End Demo</DemoButton>
            <SnapshotButton variant="outlined">Take Snapshot</SnapshotButton>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Grid>
  );
}
