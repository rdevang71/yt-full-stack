// src/App.js
import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar.js';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';
import { getCurrentUser } from './api/auth.js'; // assuming this is where auth.js is

function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Sync login state with backend on initial load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getCurrentUser();
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currentPath={location.pathname} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </>
  );
}

export default App;
