import React, { useState, useEffect, useMemo, Profiler } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './styles/theme';

import './styles/styles.css';

import Main from './containers/Main';
import SignIn from './components/SignIn';
import Demo from './prototype/Demo';
import ComponentTree from './containers/ComponentTree';
import { UserContext } from './contexts/UserContext';
import { useAppDispatch } from './hooks';

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

  const dispatch = useAppDispatch();

  return (
    <Router>
      <UserContext.Provider value={providerUser}>
        <DndProvider backend={HTML5Backend}>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path="/" element={user ? <Navigate to="/dashboard" /> : <SignIn />} />
              <Route path="/dashboard" element={<Main />}>
                <Route index element={<ComponentTree />} />
                <Route
                  path="demo"
                  element={
                    <Profiler
                      id="Demo"
                      onRender={(id: string, phase: string, actualDuration: number) => {
                        dispatch({ type: 'profiler/storeProfilerData', payload: { id, phase, actualDuration } });
                        console.log('this is id', id);
                        console.log('this is phase', phase);
                        console.log('this is actualDuration', actualDuration);
                      }}
                    >
                      <Demo />
                    </Profiler>
                  }
                />
              </Route>
            </Routes>
          </ThemeProvider>
        </DndProvider>
      </UserContext.Provider>
    </Router>
  );
};

export default hot(App);
