import React from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';

import { Button, withStyles } from '@material-ui/core';

const StyledButton = withStyles({
  root: {
    backgroundColor: '#fff',
    color: '#000',
    '&:hover': {
      backgroundColor: '#fff',
      borderColor: '#388e3c',
      color: '#000'
    }
  }
})(Button);

export default function NewComponent(props: any) {
  const { label } = props;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'box',
    // pass in object containing payload of component label
    item: { label: label },
    collect: (monitor: DragSourceMonitor) => ({
      // grab the label object for use in tree > components > RenderCard
      item: monitor.getItem(),
      isDragging: !!monitor.isDragging()
    }),
    options: {
      dropEffect: 'copy'
    }
  }));

  return (
    <div ref={drag}>
      <StyledButton variant="outlined" size="large">
        {label}
      </StyledButton>
    </div>
  );
}
