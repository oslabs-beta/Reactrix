import * as React from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { nanoid } from 'nanoid';
import { ListItem } from '@material-ui/core';

import SingleReusableComponent from '../components/SingleReusableComponent';

export default function ReusableComponent() {
  const reusableComponents = [
    {
      id: nanoid(),
      component: {
        type: 'container',
        content: 'Container 4',
      },
    },
    {
      id: nanoid(),
      component: {
        type: 'container',
        content: 'Container 5',
      },
    },
    {
      id: nanoid(),
      component: {
        type: 'component',
        content: 'Child 4',
      },
    },
    {
      id: nanoid(),
      component: {
        type: 'component',
        content: 'Child 5',
      },
    },
  ];

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
    <div>
      {Object.values(reusableComponents).map((ele) => (
        <ListItem>
          <SingleReusableComponent
            key={ele.id}
            content={ele.component.content}
          />
        </ListItem>
      ))}
    </div>
  );
}
