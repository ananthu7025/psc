import React from 'react'

const Navbar = () => {
  return (
    <nav
    className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
    id="navbarBlur"
    navbar-scroll="true"
  >
    <div className="container-fluid py-1 px-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
          <li className="breadcrumb-item text-sm">
            <a className="opacity-5 text-dark" href="javascript:;">
              Pages
            </a>
          </li>
          <li
            className="breadcrumb-item text-sm text-dark active"
            aria-current="page"
          >
            Template
          </li>
        </ol>
        <h6 className="font-weight-bolder mb-0">Template</h6>
      </nav>
      <div
        className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
        id="navbar"
      >
        <div className="ms-md-auto pe-md-3 d-flex align-items-center">
          <div className="input-group input-group-outline">
            <label className="form-label">Type here...</label>
            <input type="text" className="form-control" />
          </div>
        </div>
      </div>
    </div>
  </nav>
  
  )
}

export default Navbar
