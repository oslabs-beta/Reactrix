import React from 'react';
import { Button, Checkbox, FormControlLabel, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { TreeView } from '@mui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

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

export default function Snapshots(props: any) {
  const classes = useStyles();

  const { allSnapshots } = props;

  const setTimestamp = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTime = date + ' ' + time;

    return `Snapshot (${dateTime})`;
  };

  return (
    <div>
      <Typography variant="h6">Snapshots</Typography>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        className={classes.snapshots}
        sx={{
          height: 300,
          flexGrow: 1,
          maxWidth: 300,
          overflowY: 'auto',
          marginTop: 2
        }}
      >
        {allSnapshots.slice(1).map((snapshot: any, index: any) => {
          return snapshot.label !== 'undefined' ? <FormControlLabel value="start" control={<Checkbox />} label={setTimestamp()} key={index} /> : null;
        })}
      </TreeView>
    </div>
  );
}
