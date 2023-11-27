import React from 'react'
import { useLocation } from 'react-router-dom';
import images from '../images';
import { useGetUserDetailsQuery } from '../api/modules/login';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { data: user } = useGetUserDetailsQuery();

  return (
    <nav
    className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
    id="navbarBlur"
    navbar-scroll="true"
  >
    <div className="container-fluid py-1 px-3">
      <nav aria-label="breadcrumb">
        <h6 className="font-weight-bolder mb-0 mt-2">PSCGREEN{currentPath}</h6>
      </nav>
    <div  className='d-flex'>
      <img 
       alt="profile_image"
       className="w-100 border-radius-lg shadow-sm"
       style={{width:"10px",height:"40px",borderRadius:"50%"}}
      src={images.avatar}/>
      <h6 style={{marginLeft:"10px",marginTop:"10px"}}>{user?.name}</h6>
    </div>    
    </div>
  </nav>
  
  )
}

export default Navbar
