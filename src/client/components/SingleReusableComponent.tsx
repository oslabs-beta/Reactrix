import * as React from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { Button } from '@material-ui/core';

interface component {
  content: string;
}

export default function DraggableComponent({ content }: component) {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: 'box',
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
      <Button variant='outlined' size='small' key='Reusable Component'>
        {content}
      </Button>
    </div>
  );
}
