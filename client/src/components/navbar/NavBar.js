import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

import "./Navbar.css";

const NavBar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [dropdown, setDropDown] = useState(false);

  const handleToggle = () => setToggleMenu(!toggleMenu);

  const closeMenu = () => setToggleMenu(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropDown(false);
    } else setDropDown(true);
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropDown(false);
    } else setDropDown(false);
  };

  return (
    <React.Fragment>
      <nav className="navbar">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          COVID-19 INFORMATION
        </Link>
        <div className="menu-icon" onClick={handleToggle}>
          <i className={toggleMenu ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={toggleMenu ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li
            className="nav-item"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link to="/data-viz" className="nav-links" onClick={closeMenu}>
              Vaccination History <i className="fas fa-caret-down" />
            </Link>
            {dropdown && <Dropdown />}
          </li>
          <li className="nav-item">
            <Link to="/resources" className="nav-links" onClick={closeMenu}>
              Resources
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-links" onClick={closeMenu}>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
