import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isCollapsed }) => {
  const location = useLocation();

  const sidebarStyle = {
    width: isCollapsed ? "80px" : "240px",
    transition: "width 0.3s ease",
    backgroundColor: "#000",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
  };

  const scrollAreaStyle = {
    flexGrow: 1,
    overflowY: "auto",
    paddingTop: "16px",
    paddingBottom: "24px",
  };

  const baseLinkStyle = {
    fontSize: "1.2rem",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    justifyContent: isCollapsed ? "center" : "flex-start",
    padding: isCollapsed ? "8px" : "8px 16px",
    whiteSpace: "nowrap",
    transition: "all 0.3s ease",
    textDecoration: "none",
    color: "#fff",
    borderRadius: "6px",
    position: "relative",
  };

  const iconStyle = {
    fontSize: "1.5rem",
    transition: "transform 0.3s ease",
  };

  const activeLinkStyle = {
    backgroundColor: "#2f4c45ff",
    color: "#000",
    fontWeight: "600",
  };

  const hoverLinkStyle = {
    backgroundColor: "#1a1a1a",
  };

  const hrStyle = {
    borderColor: "#888",
    backgroundColor: "#888",
    height: "3px",
    margin: isCollapsed ? "8px auto" : "8px 16px",
    width: isCollapsed ? "50%" : "100%",
    borderRadius: "1.5px",
    border: "none",
  };

  const navItems = [
    { label: "Home", icon: "🏠", href: "/" },
    { label: "Trending", icon: "🔥", href: "/trending" },
    { divider: true },
    { label: "You", icon: "👤", href: "/profile" },
    { label: "Your Channel", icon: "📡", href: "/channel" },
    { label: "History", icon: "⏳", href: "/history" },
    { label: "Playlists", icon: "🗂️", href: "/playlists" },
    { label: "Your videos", icon: "📹", href: "/your-videos" }, // ✅ Route that matches new YourVideosPage
    { label: "Your courses", icon: "🎓", href: "/your-courses" },
    { label: "Liked videos", icon: "👍", href: "/liked-videos" },
    { divider: true },
  ];

  return (
    <div className="sidebar" style={sidebarStyle}>
      <div
        style={scrollAreaStyle}
        className="sidebar-links d-flex flex-column gap-2"
      >
        {navItems.map((item, index) => {
          if (item.divider) {
            return <hr key={`divider-${index}`} style={hrStyle} />;
          }

          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.label}
              to={item.href}
              style={{
                ...baseLinkStyle,
                ...(isActive ? activeLinkStyle : {}),
              }}
              className="text-white sidebar-item"
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = hoverLinkStyle.backgroundColor;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              <span style={iconStyle}>{item.icon}</span>
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;