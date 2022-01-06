import React from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { nanoid } from 'nanoid';
import { ListItem } from '@material-ui/core';

import SingleReusableComponent from '../components/SingleReusableComponent';

export default function ReusableComponent() {
  const reusableComponents = [
    {
      id: nanoid(),
      label: 'Container 4',
      children: [],
    },
    {
      id: nanoid(),
      label: 'Container 5',
      children: [],
    },
    {
      id: nanoid(),
      label: 'Component 5',
      children: [],
    },
    {
      id: nanoid(),
      label: 'Component 6',
      children: [],
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
      {Object.values(reusableComponents).map((ele, key) => (
        <ListItem>
          <SingleReusableComponent label={ele.label} key={key} />
        </ListItem>
      ))}
    </div>
  );
}
