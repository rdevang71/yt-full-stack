// src/components/Navbar/navbar.js
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
      "/": "linear-gradient(90deg, #9e95d8ff, #90257bff)",
      "/login": "linear-gradient(90deg, #a2ebd9ff, #1dd1a1)",
      "/register": "linear-gradient(90deg,#97becaff, #32439bff)",
      "/profile": "linear-gradient(90deg, #e8f5e9, #ffffff)",
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
        background: backgroundGradient,
        transition: "background 0.6s ease-in-out",
      }}
    >
      {showHomeButton && (
        <Link
          to="/"
          className="text-center"
          style={{
            color: "#fff",
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transition: "all 0.4s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <i
            className="fas fa-home"
            style={{
              fontSize: "22px",
              color: "#fff",
              transition: "color 0.3s ease",
            }}
          ></i>
          <div style={{ fontSize: "12px", marginTop: "4px", fontWeight: 500 }}>
            Home
          </div>
        </Link>
      )}

      <div className="d-flex align-items-center gap-3">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="btn btn-outline-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline-primary">
              Register
            </Link>
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
