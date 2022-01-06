import * as React from 'react';
import { useDrop } from 'react-dnd';

import { Button } from '@material-ui/core';

export default function NewComponent() {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'box',
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
}
