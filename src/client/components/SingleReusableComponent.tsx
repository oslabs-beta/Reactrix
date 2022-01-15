import * as React from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { Button } from '@material-ui/core';

// interface IReusableComponent {
//     label: any;
// }

export default function SingleReusableComponent(props: any) {
    const { id, label, url, state, hook, children } = props.details;
    const [collected, drag, dragPreview] = useDrag(() => ({
        type: 'box',
        item: {
            id: id,
            label: label,
            url: url,
            state: state,
            hook: hook,
            children: children
        },
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
