import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  // Dynamic background based on route
  const getNavbarStyle = () => {
    if (location.pathname === '/login') {
      return 'linear-gradient(to right, #86cdbbff, #1dd1a1)'; // pinkish gradient
    } else if (location.pathname === '/register') {
      return 'linear-gradient(to right, #8aabd2ff, #0646a1ff)'; // blue gradient
    }
    return 'linear-gradient(to right, #a18cd1, #fbc2eb)'; // default gradient for Home/other pages
  };

  return (
    <nav style={{ ...styles.navbar, background: getNavbarStyle() }}>
      <h2 style={styles.logo}>MyApp</h2>
      <div>
        <Link to="/register" style={styles.button} className="nav-btn">
          Register / Login
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    transition: 'background 0.5s ease', // smooth color transition
  },
  logo: {
    margin: 0,
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#fff',
  },
  button: {
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: '0.6rem 1.2rem',
    borderRadius: '8px',
    fontWeight: '500',
    backdropFilter: 'blur(4px)',
    transition: 'all 0.3s ease',
  },
};

export default Navbar;
