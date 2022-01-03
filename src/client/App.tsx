import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { theme } from './styles/theme';
import { ThemeProvider } from '@material-ui/core';

import './styles/styles.css';

import Navbar from './components/Navbar';
import ComponentLibrary from './containers/ComponentLibrary';
import ComponentTree from './containers/ComponentTree';
import ComponentDetails from './containers/ComponentDetails';

const App = () => (
  <div>
    <ThemeProvider theme={theme}>
      <Navbar />
      <ComponentLibrary />
      {/* <ComponentTree /> */}
      {/* <ComponentDetails /> */}
    </ThemeProvider>
  </div>
);

export default hot(App);
