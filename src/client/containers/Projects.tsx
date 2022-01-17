import React from 'react';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, OutlinedInput, createStyles, makeStyles, Theme, Typography, withStyles } from '@material-ui/core';
import { TreeView, TreeItem } from '@mui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    projects: {
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

export default function Projects(props: any) {
  const classes = useStyles();

  const { allProjects, newProject, newSnapshot, projectId, projectName, snapshots, setNewProject, handleAddNewProjectToAllProjects, handleSaveNewProject, handleOnChangeProjectName } = props;

  return (
    <div>
      <Typography variant="h6">Projects</Typography>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        className={classes.projects}
        sx={{
          height: 300,
          flexGrow: 1,
          maxWidth: 400,
          overflowY: 'auto',
          marginTop: 2
        }}
      >
        {Object.values(allProjects.slice(1)).map((ele: any, key: any) => {
          return (
            <TreeItem nodeId={ele.projectId} label={ele.projectName}>
              <FormControlLabel value="start" control={<Checkbox />} label={ele.projectName} key={ele.projectId} />
            </TreeItem>
          );
        })}
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
            onChange={handleOnChangeProjectName}
          />
        </FormControl>
        <SaveButton
          variant="outlined"
          className={classes.save}
          onClick={() => {
            handleSaveNewProject(projectId, projectName, snapshots);
            // handleAddNewProjectToAllProjects(newProject);
          }}
        >
          Save Project
        </SaveButton>
      </Box>
    </div>
  );
}
