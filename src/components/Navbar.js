import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import images from '../images';
import { useGetUserDetailsQuery } from '../api/modules/login';

const Navbar = ({ toggleSidebar }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { data: user } = useGetUserDetailsQuery();

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleToggleSidebar = () => {
      if (isSmallScreen) {
        toggleSidebar();
      }
    };

    const iconNavbarSidenav = document.getElementById('iconNavbarSidenav');

    if (iconNavbarSidenav) {
      iconNavbarSidenav.addEventListener('click', handleToggleSidebar);
    }

    return () => {
      if (iconNavbarSidenav) {
        iconNavbarSidenav.removeEventListener('click', handleToggleSidebar);
      }
    };
  }, [toggleSidebar, isSmallScreen]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <nav
  className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
  id="navbarBlur"
  data-scroll="true"
>
  <div className="container-fluid py-1 px-3">
    <nav aria-label="breadcrumb">
    <h6 className="font-weight-bolder mb-0 mt-2">PSCGREEN{currentPath}</h6>
 
    </nav>
    <div  className='d-flex'>
    
    </div>    
    <div
      className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
      id="navbar"
    >
      
      <ul className="navbar-nav  justify-content-end">

      <h6 style={{marginLeft:"10px",marginTop:"10px"}}>{user?.name}</h6>
        <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
          <a
            href="javascript:;"
            className="nav-link text-body p-0"
            id="iconNavbarSidenav"
            
          >
            <div className="sidenav-toggler-inner">
              <i className="sidenav-toggler-line" />
              <i className="sidenav-toggler-line" />
              <i className="sidenav-toggler-line" />
            </div>
          </a>
        </li>
       
      </ul>
    </div>
  </div>
</nav>

  
  )
}

export default Navbar
