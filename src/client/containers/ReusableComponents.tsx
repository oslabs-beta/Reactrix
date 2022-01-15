import React from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { ListItem } from '@material-ui/core';

import SingleReusableComponent from '../components/SingleReusableComponent';

export default function ReusableComponent(props: any) {
    let { reusableComponents } = props;

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
            {reusableComponents.map((ele: any, key: any) => (
                <ListItem>{ele.label !== 'App' ? <SingleReusableComponent details={ele} key={key} /> : null}</ListItem>
            ))}
        </div>
    );
}
