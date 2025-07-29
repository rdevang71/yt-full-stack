// src/components/Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../api/auth.js'; // Centralized API method

function Logout({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      
      await logoutUser();

      // Clear client-side session state
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn?.(false); // Safe optional chaining

      // Navigate to login
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error?.response?.data || error.message);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <button onClick={handleLogout} className="nav-btn logout">
      Logout
    </button>
  );
}

export default Logout;

