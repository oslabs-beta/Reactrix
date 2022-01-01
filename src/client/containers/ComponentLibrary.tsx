import * as React from 'react';
import Button from '@material-ui/core/Button';

interface Props {
  message: string;
}

const ComponentLibrary = ({ message }: Props) => (
  <div id='componentLibrary'>
    <h3>Component Library</h3>
    <Button variant='outlined' size='small'>
      {message}
    </Button>
  </div>
);

export default ComponentLibrary;