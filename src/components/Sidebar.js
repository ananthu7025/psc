import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside
      className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark"
      id="sidenav-main"
    >
      <div className="sidenav-header">
        <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
        <a className="navbar-brand m-0" href="https://demos.creative-tim.com/material-dashboard/pages/dashboard" target="_blank">
          <img src="../assets/img/logo-ct.png" className="navbar-brand-img h-100" alt="main_logo" />
          <span className="ms-1 font-weight-bold text-white">PSC Green</span>
        </a>
      </div>
      <hr className="horizontal light mt-0 mb-2" />
      <div className="collapse navbar-collapse w-auto max-height-vh-100" id="sidenav-collapse-main">
        <ul className="navbar-nav">
          <li class="nav-item">
            <Link to="/home" className={`nav-link ${currentPath === '/home' ? 'active bg-gradient-success' : ''}`}>
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">assignment</i>
              </div>
              <span className="nav-link-text ms-1">Home</span>
            </Link>
          </li>
          <li class="nav-item">
            <Link to="/quiz-cat" className={`nav-link ${currentPath === '/quiz-cat' ? 'active bg-gradient-success' : ''}`}>
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">assignment</i>
              </div>
              <span className="nav-link-text ms-1">Mock Test</span>
            </Link>
          </li>
          <li class="nav-item">

            <Link to="/PscNotifications" className={`nav-link ${currentPath === '/PscNotifications' ? 'active bg-gradient-success' : ''}`}>
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">notifications</i>
              </div>
              <span className="nav-link-text ms-1">PSC Notifications</span>
            </Link>
          </li>
          <li class="nav-item">

            <Link to="/Syllabus" className={`nav-link ${currentPath === '/Syllabus' ? 'active bg-gradient-success' : ''}`}>
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">library_books</i>
              </div>
              <span className="nav-link-text ms-1">Syllabus</span>
            </Link>
          </li>
          <li class="nav-item">

            <Link to="/PscBullettin" className={`nav-link ${currentPath === '/PscBullettin' ? 'active bg-gradient-success' : ''}`}>
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">library_books</i>
              </div>
              <span className="nav-link-text ms-1">PSC Bulletin</span>
            </Link>
          </li>
          <li class="nav-item">

            <Link to="/PreviousQuestionPaper" className={`nav-link ${currentPath === '/PreviousQuestionPaper' ? 'active bg-gradient-success' : ''}`}>
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">library_books</i>
              </div>
              <span className="nav-link-text ms-1">Previous Question Paper</span>
            </Link>
          </li>
          <li class="nav-item">

            <Link to="/StudyPlan" className={`nav-link ${currentPath === '/StudyPlan' ? 'active bg-gradient-success' : ''}`}>
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">library_books</i>
              </div>
              <span className="nav-link-text ms-1">SCERT Study Plan</span>
            </Link>
          </li>
          <li class="nav-item">

            <Link to="/SpecialTopic" className={`nav-link ${currentPath === '/SpecialTopic' ? 'active bg-gradient-success' : ''}`}>
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">library_books</i>
              </div>
              <span className="nav-link-text ms-1">Special Topic</span>
            </Link>
          </li>
          <li class="nav-item">

            <Link to="/Profile" className={`nav-link ${currentPath === '/Profile' ? 'active bg-gradient-success' : ''}`}>
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">person</i>
              </div>
              <span className="nav-link-text ms-1">Profile</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
