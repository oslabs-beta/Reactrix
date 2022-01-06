// import React from 'react';
// import * as ReactDOM from 'react-dom';
// import App from './client/App';

// const root = document.getElementById('root');
// ReactDOM.render(<App />, root);


import React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignIn from './client/containers/SignIn';

import App from './client/App';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/login" element={<SignIn/>}>
                    {/* <Route path="/login" element={<SignIn />} /> */}
                </Route>
                <Route path="/" element={<App />}>
                    {/* <Route path="/login" element={<SignIn />} /> */}
                </Route>
            </Routes>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
)