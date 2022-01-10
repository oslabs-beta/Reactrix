import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { theme } from '../styles/theme';
import { ThemeProvider } from '@material-ui/core';

import Navbar from '../components/Navbar';
import ComponentLibrary from '../containers/ComponentLibrary';
// import ComponentTree from './containers/ComponentTree';
// import ComponentDetails from './containers/ComponentDetails';
import Footer from '../components/Footer';

const GuestDashBoard = () => {
    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <ThemeProvider theme={theme}>
                    <Navbar />
                    <ComponentLibrary />
                    {/* <Footer /> */}
                </ThemeProvider>
            </DndProvider>
        </div>
    );
};

export default GuestDashBoard;
