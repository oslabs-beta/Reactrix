import * as React from 'react';
import {
  Box,
  Button,
  TextField,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

export default function ComponentDetails() {
  function handleClick() {
    // setLoading(true);
  }
  
  return (
    <Box
      component="form"
      sx={{
        m: 1, width: '25ch'
        // '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      // noValidate=
      // autoComplete="off"
    >
      <div>
        <TextField
          // required
          id="outlined-required"
          label="Component Name"
          defaultValue="New Component"
        />
        <TextField
          // disabled
          id="outlined-disabled"
          label="URL"
          defaultValue="URL"
        />
        <TextField
          id="outlined-read-only-input"
          label="State"
          defaultValue="State"
          InputProps={{
            // readOnly: true,
          }}
        />
        <TextField
          id="outlined-helperText"
          label="Hooks"
          defaultValue="Default Value"
          helperText="Declare a hook that this component will trigger"
        />
      </div>
      <Button 
        // onClick={handleClick}
        startIcon={<SaveIcon />}
        variant="contained">Save</Button>
    </Box>
  );
}
