import React from 'react';
import axios from 'axios';
import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core';

import { useTreeContext } from '../containers/GridContainer';

export default function Demo() {
  const TreeContext = useTreeContext();
  const rootNode = TreeContext[0];

  console.log('rootNode', rootNode);

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
        <Typography variant="caption">Default Component</Typography>
        <Typography variant="h3">Name: Default</Typography>
      </CardContent>
      <CardActions></CardActions>
    </React.Fragment>
  );

  // const detailCard = (
  //   <React.Fragment>
  //     <CardContent>
  //       <Typography variant="caption">Reusable Component</Typography>
  //       <Typography variant="h3">Name: {formatComponentName(rootNode.label)}</Typography>
  //     </CardContent>
  //     <CardActions>
  //       {rootNode.url ? (
  //         <Button
  //           variant="outlined"
  //           size="small"
  //           onClick={() => {
  //             handleRequest(rootNode.url);
  //           }}
  //         >
  //           API Call
  //         </Button>
  //       ) : null}
  //       {rootNode.state ? <Typography variant="body2">State: {rootNode.state}</Typography> : null}
  //       {rootNode.hook ? <Typography variant="body2">Hook: {rootNode.hook}</Typography> : null}
  //     </CardActions>
  //   </React.Fragment>
  // );

  return (
    <Grid container spacing={2}>
      <Grid item xs={8} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography variant="h6">Demo</Typography>
            <Box sx={{ minWidth: 275, maxWidth: 550, p: 2 }}>
              <Card variant="outlined">{emptyCard}</Card>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
