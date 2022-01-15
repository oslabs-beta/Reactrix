import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import ComponentLibrary from './containers/ComponentLibrary';
import Footer from './components/Footer';

const Main = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Main;
