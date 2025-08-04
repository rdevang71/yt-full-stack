// src/components/navbar/Navbar.js
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";
import PublishModal from "./PublishModal"; // ✅ NEW

const Navbar = ({ isLoggedIn, user, onToggleSidebar, isSidebarCollapsed }) => {
  const [backgroundGradient, setBackgroundGradient] = useState(
    "linear-gradient(90deg, #ffffff, #f8f9fa)"
  );
  const [homeButtonGradient, setHomeButtonGradient] = useState("#ffffff");
  const [showPublishModal, setShowPublishModal] = useState(false); // ✅ NEW

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const routeBackgroundMap = {
      "/": "linear-gradient(90deg, #000, #000)",
      "/login": "linear-gradient(90deg, #a2ebd9ff, #1dd1a1)",
      "/register": "linear-gradient(90deg,#97becaff, #32439bff)",
      "/profile": "linear-gradient(90deg, #000, #000)",
      "/publish": "linear-gradient(90deg, #000, #000)",
      "/playlists": "linear-gradient(90deg, #000, #000)",
    };

    const newGradient =
      routeBackgroundMap[location.pathname] ||
      "linear-gradient(90deg, #000, #000)";
    setBackgroundGradient(newGradient);
    setHomeButtonGradient(newGradient);
    document.documentElement.style.setProperty("--navbar-bg", newGradient);
  }, [location]);

  const handleAvatarClick = () => navigate("/profile");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const showHomeButton =
    location.pathname !== "/login" && location.pathname !== "/register";

  return (
    <>
      <nav
        className="navbar d-flex justify-content-between align-items-center px-4 py-2"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          background: backgroundGradient,
          transition: "background 0.6s ease-in-out",
        }}
      >
        <div className="d-flex align-items-center gap-3">
          {isLoggedIn && (
            <span
              className="hamburger-icon"
              onClick={onToggleSidebar}
              title="Toggle Sidebar"
              style={{
                cursor: "pointer",
                fontSize: "1.8rem",
                color: "#fff",
                padding: "4px 8px",
                backgroundColor: "#000",
                borderRadius: "6px",
              }}
            >
              ☰
            </span>
          )}

          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <h4 className="logo animated-logo" style={{ cursor: "pointer" }}>
              🎬 DTube
            </h4>
          </Link>
        </div>

        <div className="d-flex align-items-center gap-3">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="btn btn-outline-primary text-white">
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-outline-primary text-white"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {showHomeButton && (
                <button
                  className="d-flex align-items-center gap-2"
                  style={{
                    fontWeight: "500",
                    borderRadius: "8px",
                    padding: "6px 12px",
                    backgroundColor: "#2a2d2bff",
                    color: "#ffffff",
                    border: "none",
                    textDecoration: "none",
                    transition: "background 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    const btn = e.currentTarget;
                    const icon = btn.querySelector("span");
                    btn.style.backgroundColor = "#1b1f1cff";
                    if (icon) icon.style.backgroundColor = "#1b1f1cff";
                  }}
                  onMouseLeave={(e) => {
                    const btn = e.currentTarget;
                    const icon = btn.querySelector("span");
                    btn.style.backgroundColor = "#2a2d2bff";
                    if (icon) icon.style.backgroundColor = "#2a2d2bff";
                  }}
                  onClick={() => setShowPublishModal(true)} // ✅ NEW
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
                </button>
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

      {showPublishModal && (
        <PublishModal onClose={() => setShowPublishModal(false)} />
      )}
    </>
  );
};

export default Navbar;