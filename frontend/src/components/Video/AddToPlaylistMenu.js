import React, { useState } from "react";

const sideMenuStyle = {
  position: "absolute",
  bottom: "48px",
  right: "50px",
  backgroundColor: "#2c2c2e",
  color: "#fff",
  borderRadius: "6px",
  padding: "16px",
  boxShadow: "0 2px 12px rgba(0,0,0,0.5)",
  fontSize: "0.95rem",
  zIndex: 999,
  width: "260px",
};

const inputStyle = {
  width: "100%",
  padding: "6px 10px",
  marginBottom: "8px",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#1c1c1c",
  color: "#fff",
};

const buttonStyle = {
  width: "100%",
  padding: "8px",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#444",
  color: "#fff",
  cursor: "pointer",
};

const AddToPlaylistMenu = ({ onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name || !description) {
      alert("Please fill out both fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/api/v1/playlist/create-playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify({ name, description }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Playlist created successfully!");
        setName("");
        setDescription("");
        onClose();
      } else {
        throw new Error(data.message || "Failed to create playlist");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={sideMenuStyle} onClick={(e) => e.stopPropagation()}>
      <strong style={{ marginBottom: "8px", display: "block" }}>
        ➕ Create New Playlist
      </strong>
      <input
        style={inputStyle}
        placeholder="Playlist Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        style={inputStyle}
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button style={buttonStyle} onClick={handleCreate} disabled={loading}>
        {loading ? "Creating..." : "Create"}
      </button>
    </div>
  );
};

export default AddToPlaylistMenu;