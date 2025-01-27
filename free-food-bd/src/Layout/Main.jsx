import React from 'react';
import Navbar from '../Component/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Component/Footer';

const Main = () => {
    return (
        <div>
            {/* Navbar */}
        <Navbar />
        {/* Outlet */}
        <div className='min-h-[calc(100vh-306px)]'>
          <Outlet />
        </div>
        {/* Footer */}
        <Footer />
        </div>
    );
};

export default Main;