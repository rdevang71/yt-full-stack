// src/components/navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

function Navbar({ isLoggedIn, setIsLoggedIn, currentPath }) {
  
  // Determine theme class based on route
  const getThemeClass = () => {
    if (currentPath === '/register') return 'register-theme';
    if (currentPath === '/login') return 'login-theme';
    return 'home-theme';
  };

  return (
    <nav className={`navbar ${getThemeClass()}`}>
      <div className="left-section">
        <h1 className="logo">MyApp</h1>
      </div>
      <div className="right-section">
        {isLoggedIn ? (
          <Logout setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <>
            <Link to="/register" className="nav-btn">Register</Link>
            <Link to="/login" className="nav-btn">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
