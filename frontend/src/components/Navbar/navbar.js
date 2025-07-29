import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [backgroundGradient, setBackgroundGradient] = useState("linear-gradient(90deg, #ffffff, #f8f9fa)");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUser = localStorage.getItem("user");

    setIsLoggedIn(isUserLoggedIn);
    if (storedUser) setUser(JSON.parse(storedUser));

    // Define gradient backgrounds for different routes
    const routeBackgroundMap = {
      "/": "linear-gradient(90deg, #9e95d8ff, #90257bff)",
      "/login": "linear-gradient(90deg, #a2ebd9ff, #1dd1a1)",
      "/register": "linear-gradient(90deg,#97becaff, #32439bff)",
      "/profile": "linear-gradient(90deg, #e8f5e9, #ffffff)",
    };

    const newGradient = routeBackgroundMap[location.pathname] || "linear-gradient(90deg, #ffffff, #f8f9fa)";
    setBackgroundGradient(newGradient);

    // Inject CSS variable for use in button animation
    document.documentElement.style.setProperty('--navbar-bg', newGradient);
  }, [location]);

  const handleAvatarClick = () => navigate("/profile");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav
      className="navbar"
      style={{
        background: backgroundGradient,
        transition: "background 0.6s ease-in-out",
      }}
    >
      <Link to="/" className="navbar-brand">MyApp</Link>

      <div>
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
            <Link to="/register" className="btn btn-outline-primary me-2">Register</Link>
          </>
        ) : (
          <img
            src={user?.avatar || "https://via.placeholder.com/40"}
            alt="Avatar"
            onClick={handleAvatarClick}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              cursor: "pointer",
              border: "2px solid #333",
              objectFit: "cover",
            }}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
