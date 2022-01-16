import React from 'react';
import { Box, Button, FormControl, FormHelperText, OutlinedInput, createStyles, makeStyles, Theme, Typography, withStyles } from '@material-ui/core';

import GenerateComponent from './GenerateComponent';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: 450,
      flexShrink: 0,

      ['& .MuiTextField-root']: { m: 1, width: '25ch' }
    },
    save: {
      marginTop: 20
    }
  })
);

const SaveButton = withStyles({
  root: {
    backgroundColor: '#90caf9',
    color: '#000',
    '&:hover': {
      backgroundColor: '#42a5f5',
      borderColor: '#42a5f5',
      color: '#000'
    }
  }
})(Button);

export default function ComponentDetails(props: any) {
  const classes = useStyles();
  const { label, url, state, hook, handleSetDetails, handleOnChangeLabel, handleOnChangeUrl, handleOnChangeState, handleOnChangeHook } = props;

  /*
    https://jsonplaceholder.typicode.com/todos/1
    */

  return (
    <div>
      <Typography variant="h5">Component Details</Typography>
      {/* <GenerateComponent componentDetails={componentDetails} reusableComponents={reusableComponents} /> */}
      <Box className={classes.form} component="form" m={2} mt={5}>
        <div>
          <FormControl className={classes.form} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-weight"
              aria-describedby="outlined-weight-helper-text"
              placeholder="Add a component name"
              inputProps={{
                'aria-label': 'weight'
              }}
              onChange={handleOnChangeLabel}
            />
            <FormHelperText id="outlined-weight-helper-text">Name</FormHelperText>
          </FormControl>
          <FormControl className={classes.form} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-weight"
              aria-describedby="outlined-weight-helper-text"
              placeholder="Add an API call URL"
              inputProps={{
                'aria-label': 'weight'
              }}
              onChange={handleOnChangeUrl}
            />
            <FormHelperText id="outlined-weight-helper-text">URL</FormHelperText>
          </FormControl>
          <FormControl className={classes.form} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-weight"
              aria-describedby="outlined-weight-helper-text"
              placeholder="Set state"
              inputProps={{
                'aria-label': 'weight'
              }}
              onChange={handleOnChangeState}
            />
            <FormHelperText id="outlined-weight-helper-text">State</FormHelperText>
          </FormControl>
          <FormControl className={classes.form} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-weight"
              aria-describedby="outlined-weight-helper-text"
              placeholder="Add a hook"
              inputProps={{
                'aria-label': 'weight'
              }}
              onChange={handleOnChangeHook}
            />
            <FormHelperText id="outlined-weight-helper-text">Hooks</FormHelperText>
          </FormControl>
          <SaveButton
            variant="outlined"
            className={classes.save}
            onClick={() => {
              handleSetDetails(label, url, state, hook);
            }}
          >
            Save
          </SaveButton>
        </div>
      </Box>
    </div>
  );
}
