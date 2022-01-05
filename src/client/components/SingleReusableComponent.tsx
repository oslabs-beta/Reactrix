import * as React from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { Button } from '@material-ui/core';

interface IReusableComponent {
  label: string;
}

export default function DraggableComponent({ label }: IReusableComponent) {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: 'box',
    item: { label: label },
    collect: (monitor: DragSourceMonitor) => ({
      item: monitor.getItem(),
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
      <Button variant='outlined' size='medium' key={label}>
        {label}
      </Button>
    </div>
  );
}
