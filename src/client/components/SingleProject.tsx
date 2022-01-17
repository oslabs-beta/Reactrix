import React from 'react';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, createStyles, makeStyles, Theme, Typography, withStyles } from '@material-ui/core';
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

export default function SingleProject(props: any) {
  const classes = useStyles();

  const { allProjects } = props;
  console.log('ALLRPROJECTS', allProjects);

  return (
    <div>
      {Object.values(allProjects).map((ele: any, key: any) => {
        return (
          <TreeItem nodeId={ele.projectId} label={ele.projectName}>
            <FormControlLabel value="start" control={<Checkbox />} label={ele.projectName} key={ele.projectId} />
          </TreeItem>
        );
      })}
    </div>
  );
}
