// src/App.js
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/navbar.js";
import Home from "./components/Home/Home.js";
import Register from "./components/Auth/Register.js";
import Profile from "./components/Navbar/profile.js";
import Login from "./components/Auth/Login.js";
import "./App.css";
import { getCurrentUser } from "./api/auth.js";

function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // ⭐️ Store user info including avatar

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        setIsLoggedIn(true);
        setUser(res.data.user); // ⭐️ Store user data
      } catch {
        setIsLoggedIn(false);
        setUser(null); // Clear user on failure
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        user={user} // ⭐️ Pass user to Navbar
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={<Register setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/profile"
          element={<Profile setIsLoggedIn={setIsLoggedIn} />}
        />
      </Routes>
    </>
  );
}

export default App;
