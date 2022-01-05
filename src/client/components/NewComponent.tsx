import * as React from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { Button } from '@material-ui/core';

interface Props {
  label: string;
}

export default function NewComponent({ label }: Props) {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: 'box',
    // pass in object containing payload of component label
    item: { label: label },
    collect: (monitor: DragSourceMonitor) => ({
      // grab the label object for use in tree > components > RenderCard
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
      <Button variant='outlined' size='medium'>
        {label}
      </Button>
    </div>
  );
}
