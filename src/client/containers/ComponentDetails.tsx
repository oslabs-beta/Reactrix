import * as React from 'react';
import Button from '@material-ui/core/Button';

interface Props {
  message: string;
}

const ComponentDetails = ({ message }: Props) => (
  <div id='componentDetails'>
    <h3>Component Details</h3>
    <Button variant='outlined' size='small'>
      {message}
    </Button>
  </div>
);

export default ComponentDetails;