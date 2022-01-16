import React from 'react';
import axios from 'axios';
import { Box, Button, ButtonGroup, Card, CardActions, CardContent, Grid, Typography, withStyles } from '@material-ui/core';

const DemoButton = withStyles({
  root: {
    backgroundColor: '#ffca28',
    color: '#000',
    '&:hover': {
      backgroundColor: '#ffb300',
      borderColor: '#ffb300',
      color: '#000'
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
            <DemoButton variant="outlined">Take Snapshot</DemoButton>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Grid>
  );
}
