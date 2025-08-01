
import React from "react";

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "#1b1f1c",
  color: "#fff",
  padding: "2rem",
  borderRadius: "12px",
  width: "400px",
  boxShadow: "0 6px 16px rgba(0,0,0,0.5)",
};

const AddToPlaylistModal = ({ onClose }) => {
  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginBottom: "1rem" }}>Add to Playlist</h2>
        <p>Modal content will go here...</p>
        <button
          onClick={onClose}
          style={{
            marginTop: "1rem",
            padding: "8px 16px",
            backgroundColor: "#2c2c2e",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddToPlaylistModal;