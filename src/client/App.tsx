import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import Button from '@material-ui/core/Button';

import Navbar from './components/Navbar';

interface Props {
  message: string;
}

const App = ({ message }: Props) => (
  <div>
    <Navbar />
  </div>
);

export default hot(App);
