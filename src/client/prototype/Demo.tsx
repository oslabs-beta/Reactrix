import React, { Profiler } from 'react';
import axios from 'axios';
import { Box, Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectProfilerData } from '../slices/profilerSlice';

import { useTreeContext } from '../containers/GridContainer';

export default function Demo() {
  const TreeContext = useTreeContext();
  const rootNode = TreeContext[0];

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

  // TODO: Implement generation of component based on details
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

  const dispatch = useAppDispatch();

  return (
    <Grid container spacing={2}>
      <Grid item xs={8} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography variant="h6">Demo</Typography>
            <Box sx={{ minWidth: 275, maxWidth: 550, p: 2 }}>
              <Profiler
                id="Card"
                onRender={(id: string, phase: string, actualDuration: number) => {
                  dispatch({ type: 'profiler/storeProfilerData', payload: { id, phase, actualDuration } });
                }}
              >
                <Card variant="outlined">{emptyCard}</Card>
              </Profiler>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
