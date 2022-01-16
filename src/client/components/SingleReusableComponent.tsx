import * as React from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { Button, withStyles } from '@material-ui/core';

const StyledButton = withStyles({
  root: {
    backgroundColor: '#fff',
    color: '#000',
    '&:hover': {
      backgroundColor: '#fff',
      borderColor: '#e91e63',
      color: '#000'
    }
  }
})(Button);

export default function SingleReusableComponent(props: any) {
  const { label, url, state, hook, children } = props.details;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'box',
    item: {
      label: label,
      url: url,
      state: state,
      hook: hook,
      children: children
    },
    collect: (monitor: DragSourceMonitor) => ({
      item: monitor.getItem(),
      isDragging: !!monitor.isDragging()
    }),
    options: {
      dropEffect: 'copy'
    }
  }));

  return (
    <div ref={drag}>
      <StyledButton variant="outlined" size="large" key={label}>
        {label}
      </StyledButton>
    </div>
  );
}
