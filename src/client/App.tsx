import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import './styles/styles.css';

import Main from './Main';
import SignIn from './containers/SignIn';
import Footer from './components/Footer';

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/dashboard" element={<Main />} />
                </Routes>
            </Router>
        </div>
    );
};

export default hot(App);
