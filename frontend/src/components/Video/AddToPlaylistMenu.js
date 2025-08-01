// src/components/Video/AddToPlaylistMenu.js
import React from "react";

const sideMenuStyle = {
  position: "absolute",
  bottom: "48px",
  right: "160px", // offset from the original dropdown
  backgroundColor: "#2c2c2e",
  color: "#fff",
  borderRadius: "6px",
  padding: "12px 16px",
  boxShadow: "0 2px 12px rgba(0,0,0,0.5)",
  fontSize: "0.95rem",
  whiteSpace: "nowrap",
  zIndex: 999,
  transition: "transform 0.2s ease, opacity 0.2s ease",
};

const AddToPlaylistMenu = ({ onClose }) => {
  return (
    <div style={sideMenuStyle} onClick={onClose}>
      🆕 Create New Playlist
    </div>
  );
};

export default AddToPlaylistMenu;
