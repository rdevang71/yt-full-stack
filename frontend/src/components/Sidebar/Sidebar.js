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
  };

  const baseLinkStyle = {
    fontSize: "1.2rem",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    justifyContent: isCollapsed ? "center" : "flex-start",
    padding: "8px 12px",
    whiteSpace: "nowrap",
    transition: "all 0.3s ease",
    textDecoration: "none",
    color: "#fff",
    borderRadius: "6px",
  };

  const iconStyle = {
    fontSize: "1.5rem",
  };

  const activeLinkStyle = {
    backgroundColor: "#1b1f1c",
    color: "#1dd1a1",
  };

  const hrStyle = {
    borderColor: "#777",
    margin: isCollapsed ? "8px auto" : "8px 12px",
    width: isCollapsed ? "40%" : "80%",
  };

  const navItems = [
    { label: "Home", icon: "🏠", href: "/" },
    { label: "Trending", icon: "🔥", href: "/trending" },
    { divider: true },
    { label: "You", icon: "👤", href: "/profile" },
    { label: "History", icon: "⏳", href: "/history" },
    { label: "Playlists", icon: "🗂️", href: "/playlists" },
    { label: "Your videos", icon: "📹", href: "/your-videos" },
    { label: "Your courses", icon: "🎓", href: "/your-courses" },
    { label: "Watch Later", icon: "⏰", href: "/watch-later" },
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
              className="text-white"
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