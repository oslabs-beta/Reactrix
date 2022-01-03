import * as React from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { Button } from '@material-ui/core';

export default function DraggableComponent() {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: 'TREE',
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
    options: {
      dropEffect: 'copy',
    },
  }));

  return collected.isDragging ? (
    <div ref={dragPreview} />
  ) : (
    <div ref={drag} {...collected}>
      <Button variant='outlined' size='small' key='New Component'>
        New Component
      </Button>
    </div>
  );
}
