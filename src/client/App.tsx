import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import Button from '@material-ui/core/Button';
import ComponentTree from './containers/ComponentTree';

interface Props {
  message: string;
}

const App = ({ message }: Props) => (
  <div>
    <Button variant='outlined' size='small'>
      {message}
    </Button>
    <ComponentTree message='Bye'/>
  </div>
);

export default hot(App);
