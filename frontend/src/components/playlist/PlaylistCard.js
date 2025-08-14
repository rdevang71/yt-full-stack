import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api/auth.js";

const PlaylistCard = ({ playlist, onDelete, onUpdate, isSelected, onSelect }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedName, setUpdatedName] = useState(playlist.name);
  const [updatedDescription, setUpdatedDescription] = useState(playlist.description);
  const menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
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
        backgroundColor: "#1b1f1c",
        marginBottom: "16px",
        padding: "16px",
        borderRadius: "8px",
        position: "relative",
        border: isSelected ? "2px solid #1dd1a1" : "none",
        transition: "border 0.3s ease",
      }}
    >
      <div onClick={() => onSelect(playlist._id)} style={{ cursor: "pointer" }}>
        <h3 style={{ marginBottom: "8px" }}>{playlist.name}</h3>
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
        <p>Created by: {playlist.owner?.username}</p>
        <p>Total videos: {playlist.videos?.length || 0}</p>
      </div>

      {/* Floating Menu */}
      <div ref={menuRef} style={{ position: "absolute", top: "16px", right: "16px" }}>
        <button
          style={{
            backgroundColor: "#222",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            fontSize: "1.3rem",
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
              backgroundColor: "#2c2c2e",
              color: "#fff",
              borderRadius: "6px",
              padding: "10px",
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.5)",
              fontSize: "0.95rem",
              minWidth: "160px",
              zIndex: 100,
            }}
          >
            <div
              style={{ padding: "8px", cursor: "pointer" }}
              onClick={() => {
                setShowUpdateForm(true);
                setMenuOpen(false);
              }}
            >
              ✏️ Update Playlist
            </div>
            <div
              style={{ padding: "8px", cursor: "pointer", color: "#ff4d4f" }}
              onClick={handleDelete}
            >
              🗑️ Delete Playlist
            </div>
          </div>
        )}
      </div>

      {/* Update Form */}
      {showUpdateForm && (
        <div
          style={{
            marginTop: "1rem",
            backgroundColor: "#1c1c1e",
            padding: "1rem",
            borderRadius: "8px",
            maxWidth: "400px",
          }}
        >
          <h4 style={{ marginBottom: "1rem" }}>Update Playlist</h4>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="New name"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
          <textarea
            className="form-control mb-2"
            placeholder="New description"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
          <button className="btn btn-sm btn-success me-2" onClick={handleUpdate}>
            Save Changes
          </button>
          <button className="btn btn-sm btn-secondary" onClick={() => setShowUpdateForm(false)}>
            Cancel
          </button>
        </div>
      )}
    </li>
  );
};

export default PlaylistCard;