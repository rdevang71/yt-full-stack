// src/components/Navbar/navbar.js
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ isLoggedIn, user }) => {
  const [backgroundGradient, setBackgroundGradient] = useState("linear-gradient(90deg, #ffffff, #f8f9fa)");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const routeBackgroundMap = {
      "/": "linear-gradient(90deg, #9e95d8ff, #90257bff)",
      "/login": "linear-gradient(90deg, #a2ebd9ff, #1dd1a1)",
      "/register": "linear-gradient(90deg,#97becaff, #32439bff)",
      "/profile": "linear-gradient(90deg, #e8f5e9, #ffffff)",
    };

    const newGradient = routeBackgroundMap[location.pathname] || "linear-gradient(90deg, #ffffff, #f8f9fa)";
    setBackgroundGradient(newGradient);
    document.documentElement.style.setProperty('--navbar-bg', newGradient);
  }, [location]);

  const handleAvatarClick = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav
      className="navbar d-flex justify-content-between align-items-center px-4 py-2"
      style={{
        background: backgroundGradient,
        transition: "background 0.6s ease-in-out",
      }}
    >
      <Link to="/" className="navbar-brand fs-4 fw-bold text-dark">MyApp</Link>

      <div className="d-flex align-items-center gap-3">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="btn btn-outline-primary">Login</Link>
            <Link to="/register" className="btn btn-outline-primary">Register</Link>
          </>
        ) : (
          <>
            <img
              src={
                user?.avatar && user.avatar.startsWith("http")
                  ? user.avatar
                  : "https://i.pravatar.cc/150?img=68"
              }
              alt="Avatar"
              onClick={handleAvatarClick}
              title="Go to Profile"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                cursor: "pointer",
                border: "2px solid #333",
                objectFit: "cover",
              }}
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
