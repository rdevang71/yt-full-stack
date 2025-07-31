import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ isLoggedIn, user }) => {
  const [backgroundGradient, setBackgroundGradient] = useState(
    "linear-gradient(90deg, #ffffff, #f8f9fa)"
  );
  const [homeButtonGradient, setHomeButtonGradient] = useState("#ffffff");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
   const routeBackgroundMap = {
  "/": "linear-gradient(90deg, #000, #000)",
  "/login": "linear-gradient(90deg, #a2ebd9ff, #1dd1a1)",
  "/register": "linear-gradient(90deg,#97becaff, #32439bff)",
  "/profile": "linear-gradient(90deg, #000, #000)",
  "/publish": "linear-gradient(90deg, #000, #000)",
};

    const newGradient =
      routeBackgroundMap[location.pathname] ||
      "linear-gradient(90deg, #ffffff, #f8f9fa)";
    setBackgroundGradient(newGradient);
    setHomeButtonGradient(newGradient);
    document.documentElement.style.setProperty("--navbar-bg", newGradient);
  }, [location]);

  const handleAvatarClick = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const showHomeButton =
    location.pathname !== "/login" && location.pathname !== "/register";

  return (
    <nav
      className="navbar d-flex justify-content-between align-items-center px-4 py-2"
       style={{
    position: "fixed",          // Keeps it fixed on scroll
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,               // Ensure it stays on top of other elements
    background: backgroundGradient,
    transition: "background 0.6s ease-in-out",
  }}

    >
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <h4 className="logo animated-logo" style={{ cursor: "pointer" }}>
          🎬 DTube
        </h4>
      </Link>

      <div className="d-flex align-items-center gap-3">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="btn btn-outline-primary text-white">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline-primary text-white">
              Register
            </Link>
          </>
        ) : (
          <>
            {showHomeButton && (
  <Link
    to="/publish"
    className="d-flex align-items-center gap-2"
    style={{
      fontWeight: "500",
      borderRadius: "8px",
      padding: "6px 12px",
      backgroundColor: "#2a2d2bff",
      color: "#ffffff",
      textDecoration: "none",
      transition: "background 0.3s ease",
    }}
    onMouseEnter={(e) => {
      const link = e.currentTarget;
      const icon = link.querySelector("span");
      link.style.backgroundColor = "#1b1f1cff";
      if (icon) icon.style.backgroundColor = "#1b1f1cff";
    }}
    onMouseLeave={(e) => {
      const link = e.currentTarget;
      const icon = link.querySelector("span");
      link.style.backgroundColor = "#2a2d2bff";
      if (icon) icon.style.backgroundColor = "#2a2d2bff";
    }}
  >
    <span
      style={{
        fontSize: "20px",
        color: "#ffffff",
        backgroundColor: "#2a2d2bff",
        borderRadius: "4px",
        padding: "2px 6px",
        transition: "background 0.3s ease",
      }}
    >
      ➕
    </span>
    Publish
  </Link>
)}

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
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.1)";
                e.target.style.boxShadow = "0 0 10px rgba(51, 51, 51, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "none";
              }}
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
