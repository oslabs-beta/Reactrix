import React from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';

import { Button } from '@material-ui/core';

interface Props {
  label: string;
}

export default function NewComponent({ label }: Props) {
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
      <Button variant="outlined" size="medium">
        {label}
      </Button>
    </div>
  );
}
