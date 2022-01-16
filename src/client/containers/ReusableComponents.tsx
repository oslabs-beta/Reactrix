import React, { useContext } from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { nanoid } from 'nanoid';
import { ListItem } from '@material-ui/core';

import SingleReusableComponent from '../components/SingleReusableComponent';

export default function ReusableComponent(props: any) {
  // let { reusableComponents } = props;

  //! delete this dummy data once database is functional
  const dummyData = [
    {
      id: nanoid(),
      label: 'Container 1',
      children: []
    },
    {
      id: nanoid(),
      label: 'Container 2',
      children: []
    },
    {
      id: nanoid(),
      label: 'Container 3',
      children: []
    },
    {
      id: nanoid(),
      label: 'Component 1',
      children: []
    },
    {
      id: nanoid(),
      label: 'Component 2',
      children: []
    },
    {
      id: nanoid(),
      label: 'Component 3',
      children: []
    }
  ];

  const [collected, dragPreview] = useDrag(() => ({
    type: 'box',
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging()
    }),
    options: {
      dropEffect: 'copy'
    }
  }));

  return collected.isDragging ? (
    <div ref={dragPreview} />
  ) : (
    <div>
      {dummyData.map((ele: any, key: any) => (
        <ListItem>{ele.label !== 'App' ? <SingleReusableComponent details={ele} key={key} /> : null}</ListItem>
      ))}
    </div>
  );
}
