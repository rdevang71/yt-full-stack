import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../App.css";

function Navbar() {
  const location = useLocation();
  const [themeClass, setThemeClass] = useState('navbar home-theme');

  useEffect(() => {
    // Get theme class based on pathname
    let newTheme = 'home-theme';
    if (location.pathname === '/login') newTheme = 'login-theme';
    else if (location.pathname === '/register') newTheme = 'register-theme';

    // Use slight delay to allow transition
    const timeout = setTimeout(() => {
      setThemeClass(`navbar ${newTheme}`);
    }, 50); // delay needed to trigger CSS transition

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <nav className={themeClass}>
      <div className="left-section">
        <Link to="/" className="nav-btn">
          Home
        </Link>
        <h2 className="logo">MyApp</h2>
      </div>
      <div>
        <Link to="/register" className="nav-btn">
          Register / Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
