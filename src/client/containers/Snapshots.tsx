import React from 'react';
import { Button, Checkbox, List, ListItem, ListItemIcon, ListItemText, FormControlLabel, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { ListItemButton } from '@mui/material';
import { TreeView, TreeItem } from '@mui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    snapshots: {
      marginTop: 5,
      paddingLeft: 10
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

  const { allSnapshots, handleToggle, checked } = props;
  
  return (
    <div>
      <Typography variant="h6">Snapshots</Typography>
      {allSnapshots.map((snapshot: any, index: any) => {
        return  (
          <ListItem key={index} className={classes.snapshots}>
            <ListItemButton role={undefined} onClick={handleToggle(index)} dense disableRipple>
              <ListItemIcon>
                <Checkbox edge="end" checked={checked.indexOf(index) !== -1} tabIndex={-1} disableRipple inputProps={{ 'aria-labelledby': 'Snapshot' }} />
              </ListItemIcon>
              <ListItemText id={'Snapshot'} primary={`Snapshot ${index + 1}`} />
            </ListItemButton>
          </ListItem>
        )
      })}
    </div>
  );
}
