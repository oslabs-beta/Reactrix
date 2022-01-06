import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Link } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { theme } from './styles/theme';
import { ThemeProvider } from '@material-ui/core';

import Navbar from './components/Navbar';
import ComponentLibrary from './containers/ComponentLibrary';
// import ComponentTree from './containers/ComponentTree';
// import ComponentDetails from './containers/ComponentDetails';

const App = () => {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <ThemeProvider theme={theme}>
          <Navbar />
          <ComponentLibrary />
          {/* <ComponentTree /> */}
          {/* <ComponentDetails /> */}
        </ThemeProvider>
      </DndProvider>
    </div>
  );
};

export default hot(App);

// import React from 'react';
// import { useState } from 'react';
// import { hot } from 'react-hot-loader/root';
// import './styles/styles.css';

// import DashBoard from './containers/DashBoard'; 
// import SignIn from './containers/SignIn';

// const App: React.FC = () => {
// return (
//   <Router>
//     <nav>
//       <Link to="/login">Home</Link>
//       <Link to="/dashboard">dashboard</Link>
//     </nav>
//     <Routes>
//       <Route path="/" element={ () => 
//         <SignIn setIsAuth={setIsAuth} />}
//       />
//       <Route path="/dashboard" element={ () => 
//       <DashBoard isAuth={isAuth} />}
//       />
//     </Routes>
//   </Router>
// )
// };

