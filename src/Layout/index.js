// Layout.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';



const Layout = ({ children }) => {
  return (
    <div class="g-sidenav-show  bg-gray-200">
      <Sidebar/>
      <main   class="main-content position-relative  border-radius-lg ">
      <Navbar/>
        {children}
      </main>
    </div>
  );
};

export default Layout;
