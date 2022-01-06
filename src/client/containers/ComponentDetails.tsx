import * as React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  OutlinedInput,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: 450,
      flexShrink: 0,

      ['& .MuiTextField-root']: { m: 1, width: '25ch' },
    },
    save: {
      marginTop: 20,
    },
  })
);

export default function ComponentDetails() {
  function handleClick() {
    // setLoading(true);
  }

  const classes = useStyles();

  return (
    <Box className={classes.form} component='form' m={2} mt={5}>
      <div>
        <FormControl className={classes.form} variant='outlined'>
          <OutlinedInput
            id='outlined-adornment-weight'
            aria-describedby='outlined-weight-helper-text'
            placeholder='Add your component name'
            inputProps={{
              'aria-label': 'weight',
            }}
          />
          <FormHelperText id='outlined-weight-helper-text'>Name</FormHelperText>
        </FormControl>
        <FormControl className={classes.form} variant='outlined'>
          <OutlinedInput
            id='outlined-adornment-weight'
            aria-describedby='outlined-weight-helper-text'
            placeholder='Add an API call URL'
            inputProps={{
              'aria-label': 'weight',
            }}
          />
          <FormHelperText id='outlined-weight-helper-text'>URL</FormHelperText>
        </FormControl>
        <FormControl className={classes.form} variant='outlined'>
          <OutlinedInput
            id='outlined-adornment-weight'
            aria-describedby='outlined-weight-helper-text'
            placeholder='Set state'
            inputProps={{
              'aria-label': 'weight',
            }}
          />
          <FormHelperText id='outlined-weight-helper-text'>
            State
          </FormHelperText>
        </FormControl>
        <FormControl className={classes.form} variant='outlined'>
          <OutlinedInput
            id='outlined-adornment-weight'
            aria-describedby='outlined-weight-helper-text'
            placeholder='Add a hook'
            inputProps={{
              'aria-label': 'weight',
            }}
          />
          <FormHelperText id='outlined-weight-helper-text'>
            Hooks
          </FormHelperText>
        </FormControl>
        <Button
          // onClick={handleClick}
          startIcon={<SaveIcon />}
          variant='outlined'
          className={classes.save}
        >
          Save
        </Button>
      </div>
    </Box>
  );
}
