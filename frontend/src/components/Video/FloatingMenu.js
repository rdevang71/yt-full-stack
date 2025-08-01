import React, { useState, useRef, useEffect } from "react";
import AddToPlaylistMenu from "./AddToPlaylistMenu";

const FloatingMenu = ({ videoId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
        setShowSubmenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddClick = () => {
    setShowSubmenu(true);
    setIsOpen(false);
  };

  const wrapperStyle = {
    position: "absolute",
    bottom: "16px",
    right: "16px",
    zIndex: 100,
  };

  const buttonStyle = {
    backgroundColor: "#000",
    color: "#fff",
    fontSize: "1.5rem",
    border: "none",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.2s ease",
  };

  const dropdownStyle = {
    position: "absolute",
    bottom: "52px",
    right: "0",
    backgroundColor: "#2c2c2e",
    color: "#fff",
    borderRadius: "6px",
    padding: "10px 14px",
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.5)",
    fontSize: "0.95rem",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "transform 0.2s ease, opacity 0.2s ease",
  };

  return (
    <div style={wrapperStyle} ref={menuRef}>
      <button
        style={buttonStyle}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        title="More options"
      >
        ⋮
      </button>

      {isOpen && (
        <div
          style={dropdownStyle}
          onClick={handleAddClick}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          ➕ Add to Playlist
        </div>
      )}

      {showSubmenu && videoId && (
        <AddToPlaylistMenu videoId={videoId} onClose={() => setShowSubmenu(false)} />
      )}
    </div>
  );
};

export default FloatingMenu;