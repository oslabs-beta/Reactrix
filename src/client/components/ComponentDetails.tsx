import React from 'react';
import { Box, Button, FormControl, FormHelperText, OutlinedInput, createStyles, makeStyles, Theme, Typography, withStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: 300,
      flexShrink: 2,
      ['& .MuiTextField-root']: { m: 1, width: '25ch' }
    },
    save: {
      marginTop: 20
    }
  })
);

const SaveButton = withStyles({
  root: {
    backgroundColor: '#2196f3',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#1976d2',
      borderColor: '#1976d2',
      color: '#fff'
    }
  }
})(Button);

export default function ComponentDetails(props: any) {
  const classes = useStyles();
  const { label, url, state, hook, handleSetDetails, handleOnChangeLabel, handleOnChangeUrl, handleOnChangeState, handleOnChangeHook } = props;

  return (
    <div>
      <Typography variant="h6">Component Details</Typography>
      <Box className={classes.form} component="form" m={2} mt={5}>
        <div>
          <FormControl className={classes.form} variant="outlined">
            <FormHelperText id="outlined-weight-helper-text">Name (Required)</FormHelperText>
            <OutlinedInput
              id="outlined-adornment-weight"
              aria-describedby="outlined-weight-helper-text"
              placeholder="Add a component name"
              inputProps={{
                'aria-label': 'weight'
              }}
              onChange={handleOnChangeLabel}
            />
          </FormControl>
          <FormControl className={classes.form} variant="outlined">
            <FormHelperText id="outlined-weight-helper-text">URL (Optional)</FormHelperText>
            <OutlinedInput
              id="outlined-adornment-weight"
              aria-describedby="outlined-weight-helper-text"
              placeholder="Add an API call"
              inputProps={{
                'aria-label': 'weight'
              }}
              onChange={handleOnChangeUrl}
            />
          </FormControl>
          <FormControl className={classes.form} variant="filled">
            <FormHelperText id="outlined-weight-helper-text">State (Disabled)</FormHelperText>
            <OutlinedInput
              disabled
              id="filled-disabled"
              aria-describedby="outlined-weight-helper-text"
              placeholder="Set state"
              inputProps={{
                'aria-label': 'weight'
              }}
              onChange={handleOnChangeState}
            />
          </FormControl>
          <FormControl className={classes.form} variant="filled">
            <FormHelperText id="outlined-weight-helper-text">Hooks (Disabled)</FormHelperText>
            <OutlinedInput
              disabled
              id="filled-disabled"
              aria-describedby="outlined-weight-helper-text"
              placeholder="Add a hook"
              inputProps={{
                'aria-label': 'weight'
              }}
              onChange={handleOnChangeHook}
            />
          </FormControl>
          <SaveButton
            variant="outlined"
            className={classes.save}
            onClick={() => {
              handleSetDetails(label, url, state, hook);
            }}
          >
            Save Details
          </SaveButton>
        </div>
      </Box>
    </div>
  );
}
