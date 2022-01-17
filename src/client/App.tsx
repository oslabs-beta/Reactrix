import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { theme } from './styles/theme';
import { ThemeProvider } from '@material-ui/core';

import './styles/styles.css';

import Main from './containers/Main';
import SignIn from './components/SignIn';
import { UserContext } from './contexts/UserContext';
import Demo from './components/Demo';
import ComponentTree from './containers/ComponentTree';

const App = () => {
  const [user, setUser] = useState(null);

  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);
  useEffect(() => {
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
          if (response.status === 200) return response.json();
          throw new Error('authentication has been failed!');
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .then((err) => {
          console.log('error from main page', err);
        });
    };
    getUser();
  }, []);

  return (
    <Router>
      <UserContext.Provider value={providerUser}>
        <DndProvider backend={HTML5Backend}>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path="/" element={user ? <Navigate to="/dashboard" /> : <SignIn />} />
              <Route path="/dashboard" element={<Main />}>
                <Route index element={<ComponentTree />} />
                <Route path="demo" element={<Demo />} />
              </Route>
            </Routes>
          </ThemeProvider>
        </DndProvider>
      </UserContext.Provider>
    </Router>
  );
};

export default hot(App);
