import React from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { nanoid } from 'nanoid';
import { ListItem } from '@material-ui/core';

import SingleReusableComponent from '../components/SingleReusableComponent';

export default function ReusableComponent() {
  const reusableComponents = [
    {
      id: nanoid(),
      label: 'Container 1',
      children: [],
    },
    {
      id: nanoid(),
      label: 'Container 2',
      children: [],
    },
    {
      id: nanoid(),
      label: 'Container 3',
      children: [],
    },
    {
      id: nanoid(),
      label: 'Component 1',
      children: [],
    },
    {
      id: nanoid(),
      label: 'Component 2',
      children: [],
    },
    {
      id: nanoid(),
      label: 'Component 3',
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
