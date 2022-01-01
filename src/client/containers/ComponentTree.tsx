import * as React from 'react';
import Button from '@material-ui/core/Button';

interface Props {
    message: string;
}

const ComponentTree = ({ message }: Props) => (
    <div id='componentTree'>
        <h3>Component Tree</h3>
        <Button variant='outlined' size='small'>
            {message}
        </Button>
    </div>
);

export default ComponentTree;