import React from 'react';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, OutlinedInput, createStyles, makeStyles, Theme, Typography, withStyles } from '@material-ui/core';
import { TreeView, TreeItem } from '@mui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

type Props = {
  checked?: boolean;
  handleFirstCheck: any;
  handleCheck: any;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    snapshots: {
      marginTop: 20
    },
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

export default function Snapshots({ handleFirstCheck, handleCheck }: Props) {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h6">Projects</Typography>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        className={classes.snapshots}
        sx={{
          height: 300,
          flexGrow: 1,
          maxWidth: 400,
          overflowY: 'auto',
          marginTop: 2
        }}
      >
        <TreeItem nodeId="1" label="Project 1">
          <FormControlLabel value="start" control={<Checkbox />} onClick={handleCheck} label="01/04/2022 Snapshot 1" />
        </TreeItem>
        <TreeItem nodeId="5" label="Project 2">
          <FormControlLabel value="start" control={<Checkbox />} onClick={handleCheck} label="12/28/2021 Snapshot 3" />
          <FormControlLabel value="start" control={<Checkbox />} onChange={handleFirstCheck} label="11/11/2021 Snapshot 2" />
          <FormControlLabel value="start" control={<Checkbox />} onClick={handleCheck} label="11/09/2021 Snapshot 1" />
        </TreeItem>
        <TreeItem nodeId="3" label="Project 3">
          <FormControlLabel value="start" control={<Checkbox />} onClick={handleCheck} label="10/23/2021 Snapshot 2" />
          <FormControlLabel value="start" control={<Checkbox />} onClick={handleCheck} label="10/22/2021 Snapshot 1" />
        </TreeItem>
        <TreeItem nodeId="4" label="Project 4">
          <FormControlLabel value="start" control={<Checkbox />} onClick={handleCheck} label="10/03/2021 Snapshot 2" />
          <FormControlLabel value="start" control={<Checkbox />} onClick={handleCheck} label="09/18/2021 Snapshot 1" />
        </TreeItem>
      </TreeView>
      <Box className={classes.form} component="form" m={2}>
        <FormControl className={classes.form} variant="outlined" size="small">
          <FormHelperText id="outlined-weight-helper-text">New Project</FormHelperText>
          <OutlinedInput
            id="outlined-adornment-weight"
            aria-describedby="outlined-weight-helper-text"
            placeholder="Project name"
            inputProps={{
              'aria-label': 'weight'
            }}
          />
        </FormControl>
        <SaveButton variant="outlined" className={classes.save}>
          Save Project
        </SaveButton>
      </Box>
    </div>
  );
}
