/* eslint-disable react/jsx-filename-extension */
//babel assumes modules.export as default export, typescript does not
import * as React from 'react';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
// import store from './store';

// So that webpack can bundle styles
// import styles from './styles.scss';
console.log('jay');
console.log(App);

render(
  <App/>,
  document.getElementById('root')
);