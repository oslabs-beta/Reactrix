import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import ComponentTree from './containers/ComponentTree';
import ComponentLibrary from './containers/ComponentLibrary';
import ComponentDetails from './containers/ComponentDetails';

import Navbar from './components/Navbar';

interface Props {
  message: string;
}

const App = ({ message }: Props) => (
  <div>
    <Navbar />
    <ComponentTree message='Bye' />
    <ComponentLibrary message='Hi' />
    <ComponentDetails message='theDEETS'/>
  </div>
);

export default hot(App);