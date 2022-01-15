import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import './styles/styles.css';

import Main from './Main';
import GuestDashboard from './containers/GuestDashboard';
import SignIn from './containers/SignIn';
import Footer from './components/Footer';
import { AnyObject } from 'chart.js/types/basic';
import UserContext from './UserContext';
import Tutorial from './containers/ComponentTutorial';
import Components from './components/Components';

const App = () => {
    const [user, setUser] = useState(null);

    const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);
    useEffect(() => {
        // console.log('useEffect line 172 App.tsx is hit');
        const getUser = async () => {
            fetch('http://localhost:3000/auth/login/success', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'true'
                }
            })
                .then((response) => {
                    // console.log('line 187 response: ', response)
                    if (response.status === 200) return response.json();
                    throw new Error('authentication has been failed!');
                })
                .then((resObject) => {
                    // setUser(true)
                    setUser(resObject.user);
                })
                .then((err) => {
                    console.log('error from main page', err);
                });
        };
        getUser();
    }, []);

    // use context API;
    return <Components />;
};

export default hot(App);
