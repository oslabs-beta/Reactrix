import * as React from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { Button } from '@material-ui/core';

interface IReusableComponent {
    label: any;
}

export default function SingleReusableComponent({ label }: IReusableComponent) {
    const [collected, drag, dragPreview] = useDrag(() => ({
        type: 'box',
        item: { label: label },
        options: {
            dropEffect: 'copy'
        },
        collect: (monitor: DragSourceMonitor) => ({
            item: monitor.getItem(),
            isDragging: monitor.isDragging()
        })
    }));

    return collected.isDragging ? (
        <div ref={dragPreview} />
    ) : (
        <div ref={drag} {...collected}>
            <Button variant="outlined" size="medium" key={label}>
                {label}
            </Button>
        </div>
    );
}
