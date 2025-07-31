// src/App.js
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/navbar.js";
import Sidebar from "./components/Sidebar/Sidebar.js";
import Home from "./components/Home/Home.js";
import Register from "./components/Auth/Register.js";
import Profile from "./components/Navbar/profile.js";
import Login from "./components/Auth/Login.js";
import "./App.css";
import { getCurrentUser } from "./api/auth.js";
import Publish from "./components/Video/Publish.js";

function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        setIsLoggedIn(true);
        setUser(res.data.user);
      } catch {
        setIsLoggedIn(false);
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const hideSidebarRoutes = ["/login", "/register"];
  const isAuthRoute = hideSidebarRoutes.includes(location.pathname);

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        user={user}
      />
      {!isAuthRoute && <Sidebar />}

      {isAuthRoute ? (
        <Routes>
          <Route
            path="/register"
            element={<Register setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
        </Routes>
      ) : (
        <div className="main-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={<Profile setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/publish" element={<Publish />} />

          </Routes>
        </div>
      )}
    </>
  );
}

export default App;