import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useGetUserDetailsQuery } from '../api/modules/login';
import images from '../images';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isRefech, setIsRefech] = useState(false)
  const { data, refetch } = useGetUserDetailsQuery();
  const navigate = useNavigate();

  useEffect(() => {
    refetch()
  }, [isRefech])

  const handleLogout = () => {
    localStorage.removeItem('storage_Key');
    localStorage.removeItem('UserId');
    localStorage.removeItem('code');
    localStorage.removeItem('gtoken');
    navigate("/login")
  };
  return (
    <aside
      className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark"
      id="sidenav-main"
    >
      <div className="sidenav-header">
        <i style={{color:"white"}} className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
        <a className="navbar-brand m-0" target="_blank">
          <img style={{ width: "40px", borderRadius: "24%", marginRight: "10px" }} src={images.logo} className="navbar-brand-img h-100" alt="main_logo" />
          <span className="ms-1 font-weight-bold text-white">PSC Green</span>
        </a>
      </div>
      <hr className="horizontal light mt-0 mb-2" />
      <div className="collapse navbar-collapse w-auto max-height-vh-100" id="sidenav-collapse-main">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/home" className={`nav-link ${currentPath === '/home' ? 'active bg-gradient-success' : ''}`}>
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">dashboard</i>
              </div>
              <span className="nav-link-text ms-1">Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/quiz-cat" className={`nav-link ${currentPath === '/quiz-cat' ? 'active bg-gradient-success' : ''}`}>
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">assignment</i>
              </div>
              <span className="nav-link-text ms-1">Mock Test</span>
            </Link>
          </li>
          <li className="nav-item">

            <Link to="/EXAMCALENDER&SYLLABUS" className={`nav-link ${currentPath === '/EXAMCALENDER&SYLLABUS' ? 'active bg-gradient-success' : ''}`}>
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">notifications</i>
              </div>
              <span style={{ fontSize: "11px" }} className="nav-link-text ms-1">EXAM CALENDER & SYLLABUS</span>
            </Link>
          </li>
          <li className="nav-item">

            <Link to="/PscBullettin" className={`nav-link ${currentPath === '/PscBullettin' ? 'active bg-gradient-success' : ''}`}>
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">library_books</i>
              </div>
              <span className="nav-link-text ms-1">PSC Bulletin</span>
            </Link>
          </li>
          <li className="nav-item">

            <Link to="/PreviousQuestionPaper" className={`nav-link ${currentPath === '/PreviousQuestionPaper' ? 'active bg-gradient-success' : ''}`}>
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">library_books</i>
              </div>
              <span className="nav-link-text ms-1">Previous Question Paper</span>
            </Link>
          </li>
          <li className="nav-item">

            <Link to="/StudyPlan" className={`nav-link ${currentPath === '/StudyPlan' ? 'active bg-gradient-success' : ''}`}>
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">library_books</i>
              </div>
              <span className="nav-link-text ms-1">SCERT Study Plan</span>
            </Link>
          </li>
          <li className="nav-item">

            <Link to="/SpecialTopic" className={`nav-link ${currentPath === '/SpecialTopic' ? 'active bg-gradient-success' : ''}`}>
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">library_books</i>
              </div>
              <span className="nav-link-text ms-1">Special Topic</span>
            </Link>
          </li>
          <li className="nav-item">

            <Link to="/CurrentAffairs" className={`nav-link ${currentPath === '/CurrentAffairs' ? 'active bg-gradient-success' : ''}`}>
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">library_books</i>
              </div>
              <span className="nav-link-text ms-1">Current Affairs</span>
            </Link>
          </li>

          <li className="nav-item">

            <Link to="/Profile" className={`nav-link ${currentPath === '/Profile' ? 'active bg-gradient-success' : ''}`}>
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">person</i>
              </div>
              <span className="nav-link-text ms-1">Profile</span>
            </Link>
          </li>
          {
            data?.isAdmin ?
              <li className="nav-item">

                <Link to="/Referal" className={`nav-link ${currentPath === '/Referal' ? 'active bg-gradient-success' : ''}`}>
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">person</i>
                  </div>
                  <span className="nav-link-text ms-1">Referal</span>
                </Link>
              </li>
              : null
          }
          {
            data?.isAdmin ?
              <li className="nav-item">

                <Link to="/User" className={`nav-link ${currentPath === '/User' ? 'active bg-gradient-success' : ''}`}>
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">person</i>
                  </div>
                  <span className="nav-link-text ms-1">User List</span>
                </Link>
              </li>
              : null
          }
          {
            data?.isAdmin ?
              <li className="nav-item">

                <Link to="/questions" className={`nav-link ${currentPath === '/questions' ? 'active bg-gradient-success' : ''}`}>
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">assignment</i>
                  </div>
                  <span className="nav-link-text ms-1">Question</span>
                </Link>
              </li>
              : null
          }
          <li className="nav-item">

            <button style={{ marginLeft: "20px", background: "none", border: "none" }} onClick={handleLogout} className={`nav-link `}>
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">login</i>
              </div>
              <span className="nav-link-text ms-1">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
