import React, { useState, useRef, useEffect } from "react";

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const wrapperStyle = {
    position: "absolute",
    bottom: "12px",
    right: "12px",
    zIndex: 10,
  };

  const buttonStyle = {
    backgroundColor: "#000",
    color: "#fff",
    fontSize: "1.5rem",
    border: "none",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const dropdownStyle = {
    position: "absolute",
    bottom: "48px",
    right: "0",
    backgroundColor: "#2c2c2e",
    color: "#fff",
    borderRadius: "6px",
    padding: "8px 12px",
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.5)",
    fontSize: "0.95rem",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "transform 0.2s ease, opacity 0.2s ease",
  };

  return (
    <div style={wrapperStyle} ref={menuRef}>
      <button style={buttonStyle} onClick={() => setIsOpen(!isOpen)}>⋮</button>
      {isOpen && (
        <div style={dropdownStyle}>
          Add to Playlist
        </div>
      )}
    </div>
  );
};

export default FloatingMenu;