import * as React from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { Button } from '@material-ui/core';

export default function SingleReusableComponent(props: any) {
  const { label, url, state, hook, children } = props.details;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'box',
    item: {
      label: label,
      url: url,
      state: state,
      hook: hook,
      children: children
    },
    collect: (monitor: DragSourceMonitor) => ({
      item: monitor.getItem(),
      isDragging: !!monitor.isDragging()
    }),
    options: {
      dropEffect: 'copy'
    }
  }));

  return (
    <div ref={drag}>
      <Button variant="outlined" size="large" key={label}>
        {label}
      </Button>
    </div>
  );
}
