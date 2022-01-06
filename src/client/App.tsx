import React from 'react';
import { hot } from 'react-hot-loader/root';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { theme } from './styles/theme';
import { ThemeProvider } from '@material-ui/core';

import Navbar from './components/Navbar';
import ComponentLibrary from './containers/ComponentLibrary';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import ComponentTree from './containers/ComponentTree';
// import ComponentDetails from './containers/ComponentDetails';
import Main from './Main';

// const main = () => {
//   return (
//     <div>
//       <DndProvider backend={HTML5Backend}>
//         <ThemeProvider theme={theme}>
//           <Navbar />
//           <ComponentLibrary />
//           {/* <ComponentTree /> */}
//           {/* <ComponentDetails /> */}
//         </ThemeProvider>
//       </DndProvider>
//     </div>
//   );
// };

import SignIn from './containers/SignIn';

const App = () => {
  return(
  <Router>
    <Routes>
      <Route path="/" element={<SignIn />}/>
      <Route path="/dashboard" element={ <Main /> }/>
    </Routes>
  </Router>
  );
};
export default hot(App);