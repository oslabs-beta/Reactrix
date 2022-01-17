import React from 'react';
import { Checkbox, FormControlLabel, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
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
    }
  })
);

export default function Snapshots({ handleFirstCheck, handleCheck }: Props) {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h6">Snapshots</Typography>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        className={classes.snapshots}
        sx={{
          height: 500,
          flexGrow: 1,
          maxWidth: 450,
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
    </div>
  );
}
