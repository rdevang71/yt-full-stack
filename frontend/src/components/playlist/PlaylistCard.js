import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api/auth.js";

const PlaylistCard = ({ playlist, onDelete, onUpdate, isSelected, onSelect }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedName, setUpdatedName] = useState(playlist.name);
  const [updatedDescription, setUpdatedDescription] = useState(playlist.description);
  const menuRef = useRef();
  const formRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        formRef.current &&
        !formRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
        setShowUpdateForm(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this playlist?")) return;
    try {
      await API.delete(`/playlist/delete-playlist/${playlist._id}`);
      onDelete(playlist._id);
      alert("Playlist deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete playlist");
    }
  };

  const handleUpdate = async () => {
    try {
      await API.patch(`/playlist/update-playlist/${playlist._id}`, {
        name: updatedName,
        description: updatedDescription,
      });
      onUpdate(playlist._id, updatedName, updatedDescription);
      setShowUpdateForm(false);
      setMenuOpen(false);
      alert("Playlist updated successfully");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update playlist");
    }
  };

  return (
    <li
      style={{
        backgroundColor: "#000",
        marginBottom: "16px",
        padding: "16px",
        borderRadius: "8px",
        position: "relative",
        border: isSelected ? "2px solid #a9e6d6ff" : "none",
        transition: "border 0.3s ease",
      }}
    >
      <div onClick={() => onSelect(playlist._id)} style={{ cursor: "pointer" }}>
        <h3 style={{ marginBottom: "8px", color: "#fff" }}>{playlist.name}</h3>
        <p
          style={{
            fontSize: "0.95rem",
            color: "#cccccc",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginBottom: "6px",
          }}
          title={playlist.description}
        >
          {playlist.description || "No description available."}
        </p>
        <p style={{ color: "#aaa" }}>Created by: {playlist.owner?.username}</p>
        <p style={{ color: "#aaa" }}>Total videos: {playlist.videos?.length || 0}</p>
      </div>

      {/* Floating Menu */}
      <div ref={menuRef} style={{ position: "absolute", top: "16px", right: "16px" }}>
        <button
          style={{
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            fontSize: "3 rem",
            cursor: "pointer",
          }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ⋮
        </button>

       {menuOpen && (
  <div
    style={{
      position: "absolute",
      top: "40px",
      right: "0",
      backgroundColor: "#000",
      color: "#fff",
      borderRadius: "8px",
      padding: "8px 0",
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0)",
      fontSize: "0.95rem",
      minWidth: "180px",
      zIndex: 100,
      transition: "all 0.3s ease",
    }}
  >
    <div
      style={{
        padding: "10px 16px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        transition: "background 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3a3a3d")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
      onClick={() => {
        setShowUpdateForm(true);
        setMenuOpen(false);
      }}
    >
      ✏️ <span>Update Playlist</span>
    </div>
    <div
      style={{
        padding: "10px 16px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        color: "#ff4d4f",
        transition: "background 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3a3a3d")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
      onClick={handleDelete}
    >
      🗑️ <span>Delete Playlist</span>
    </div>
  </div>
)}
      </div>

      {/* Update Form */}
      {showUpdateForm && (
        <div
          ref={formRef}
          style={{
            marginTop: "1rem",
            backgroundColor: "#000",
            padding: "1rem",
            borderRadius: "8px",
            maxWidth: "400px",
            color: "#fff",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          <h4 style={{ marginBottom: "1rem" }}>Update Playlist</h4>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="New name"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            style={{
              backgroundColor: "#2c2c2e",
              color: "#fff",
              border: "1px solid #444",
              padding: "8px",
              borderRadius: "4px",
              marginBottom: "10px",
              width: "100%",
            }}
          />
          <textarea
            className="form-control mb-2"
            placeholder="New description"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            style={{
              backgroundColor: "#2c2c2e",
              color: "#fff",
              border: "1px solid #444",
              padding: "8px",
              borderRadius: "4px",
              marginBottom: "10px",
              width: "100%",
              resize: "vertical",
            }}
          />
          <div style={{ display: "flex", gap: "10px" }}>
  <button
    onClick={handleUpdate}
    style={{
      backgroundColor: "#67e8c6ff", 
      color: "#000",
      border: "none",
      padding: "10px 18px",
      borderRadius: "6px",
      fontWeight: "600",
      fontSize: "0.95rem",
      cursor: "pointer",
      transition: "background 0.3s ease",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#45aa96ff")}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#52b99eff")}
  >
    💾 Save
  </button>

  <button
    onClick={() => setShowUpdateForm(false)}
    style={{
      backgroundColor: "#2c2c2e",
      color: "#fff",
      border: "1px solid #444",
      padding: "10px 18px",
      borderRadius: "6px",
      fontWeight: "500",
      fontSize: "0.95rem",
      cursor: "pointer",
      transition: "background 0.3s ease",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3a3a3d")}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2c2c2e")}
  >
    ❌ Cancel
  </button>
</div>
        </div>
      )}
    </li>
  );
};

export default PlaylistCard;