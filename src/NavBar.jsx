import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';  // ❌ This overrides Tailwind styles
// This is the perfect Hamberger for small and medium devices  by using tailwind css , and Navbar For large and extra Large devices 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navbarCollapseRef = useRef(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = darkMode ? "white" : "#1b213e";
    document.body.style.color = darkMode ? "black" : "white";
  };

  const navbarStyle = {
    backgroundColor: darkMode ? "white" : "#ced2da",
    color: darkMode ? "white" : "black",
  };

  const linkClass = ({ isActive }) => {
  if (isActive) {
    return "btn btn-primary text-white px-3 rounded";
  }
  return "nav-link mx-2";
};



  const closeNavbar = () => {
    const collapseElement = navbarCollapseRef.current;
    if (collapseElement && collapseElement.classList.contains("show")) {
      // Use Bootstrap 5 Collapse instance if available
      const bsCollapse = window.bootstrap?.Collapse.getInstance(collapseElement);
      if (bsCollapse) {
        bsCollapse.hide();
      } else {
        collapseElement.classList.remove("show");
      }
    }
  };
  
  // This is the perfect Navbar For large and extra Large devices , and remove and add Hamberger for small and medium devices  by using tailwind css , and 
    // and with dark mode and light mode for navbar and Body with text color changng as well and ,with isActive css for Active Navbar Links
  return (
    <nav className="navbar navbar-expand-lg fixed-top shadow" style={navbarStyle}>
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold" to="/">
          NewsMonkey
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
          ref={navbarCollapseRef}
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 mt-2 mt-lg-0">
            <li className="nav-item">
              <NavLink className={linkClass} to="/general" onClick={closeNavbar}>
                General
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={linkClass} to="/business" onClick={closeNavbar}>
                Business
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={linkClass} to="/entertainment" onClick={closeNavbar}>
                Entertainment
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={linkClass} to="/health" onClick={closeNavbar}>
                Health
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={linkClass} to="/science" onClick={closeNavbar}>
                Science
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={linkClass} to="/sports" onClick={closeNavbar}>
                Sports
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={linkClass} to="/technology" onClick={closeNavbar}>
                Technology
              </NavLink>
            </li>
          </ul>

          <div className="form-check form-switch ms-lg-3">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onChange={toggleDarkMode}
              checked={darkMode}
            />
            <label
  className="form-check-label ms-2 fw-semibold"
  htmlFor="flexSwitchCheckDefault"
  style={{
    userSelect: "none",
    color: darkMode ? "black" : "white",
  }}
>
  {darkMode ? "Light Mode" : "Dark Mode"}
</label>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
