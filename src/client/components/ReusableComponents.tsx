import * as React from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { Button, ListItem } from '@material-ui/core';

export default function DraggableComponent() {
  const [reusableComponents, setReusableComponents] = React.useState([
    'Container Component 1',
    'Container Component 2',
    'Presentational Component 1',
    'Presentational Component 2',
    'Presentational Component 3',
  ]);
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
    <div>
      {reusableComponents.map((text, index) => (
        <div ref={drag} {...collected}>
          <ListItem>
            <Button variant='outlined' size='medium' key={index}>
              {text}
            </Button>
          </ListItem>
        </div>
      ))}
    </div>
  );
}
