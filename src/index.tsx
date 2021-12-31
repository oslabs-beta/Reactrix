import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './client/App';
import './client/styles.css';

const root = document.getElementById('root');
ReactDOM.render(<App message='test' />, root);
