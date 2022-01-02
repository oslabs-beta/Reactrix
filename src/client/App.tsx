import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { ThemeProvider } from '@material-ui/core';
import Navbar from './components/Navbar';
import ComponentTree from './containers/ComponentTree';
import ComponentLibrary from './containers/ComponentLibrary';
import { theme } from './styles/theme';

interface Props {
  message: string;
}

const App = ({ message }: Props) => (
  <div>
    <ThemeProvider theme={theme}>
      <Navbar />
      <ComponentTree message='Bye' />
      <ComponentLibrary message='Hi' />
    </ThemeProvider>
  </div>
);

export default hot(App);
