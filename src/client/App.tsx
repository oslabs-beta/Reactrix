import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import './styles/styles.css';

import Main from './Main';
import GuestDashBoard from './containers/GuestDashBoard';
import SignIn from './containers/SignIn';
import Footer from './components/Footer';
import { AnyObject } from 'chart.js/types/basic';
import UserContext from "./UserContext";
import Tutorial from './containers/ComponentTutorial';

const App = () => {
    const [user, setUser] = useState (null);

    const providerUser = useMemo(() => ({ user, setUser }), [user, setUser])
        useEffect(()=> {
            // console.log('useEffect line 172 App.tsx is hit');
            const getUser = async ()=> {
                fetch("http://localhost:3000/auth/login/success",
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": 'true',
                    },
                }   
                ).then((response) => {
                    // console.log('line 187 response: ', response)
                    if (response.status === 200) return response.json();
                    throw new Error ("authentication has been failed!")
                }).then(resObject=> {
                    // setUser(true)
                    setUser(resObject.user)
                }).then(err => {
                    console.log('error from main page', err);
                })
            }
            getUser();
        }, []);

    console.log( 'line 201 from App.tsx', user );
// use context API;
    return (
        <Router>
            <UserContext.Provider value={ providerUser }>
                <Routes>
                    <Route path="/" element={ user ? <Navigate to="/dashboard"/> : <SignIn />} />
                    <Route path="/dashboard" element={<Main />} />
                    <Route path="/tutorial" element={<Tutorial />} />
                </Routes>
            </UserContext.Provider>
        </Router>
    );
};

export default hot(App);
