import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return ( 
    <>
      <nav className="navbar navbar-dark navbar-expand-lg">
        <div className="container-fluid ">
          <NavLink className="navbar-brand" to="/prayer-times">المصلى</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-3 mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/prayer-times">اوقات الصلاه</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="quran">القرأن</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;