import React, { useState, useEffect } from "react";
import { API } from "../../api/auth"; // Make sure this includes axios with credentials

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
  width: "300px",
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

const AddToPlaylistMenu = ({ videoId, onClose }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchUserPlaylists = async () => {
      try {
        const res = await API.get("/playlist/get-userplaylist");
        setPlaylists(res.data.data.playlists);
      } catch (err) {
        console.error("Failed to load playlists:", err);
      }
    };
    fetchUserPlaylists();
  }, []);

  const handleCreate = async () => {
    if (!name || !description) {
      alert("Please fill out both fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/playlist/create-playlist", {
        name,
        description,
      });

      const newPlaylist = res.data.data;
      setPlaylists((prev) => [newPlaylist, ...prev]);
      setName("");
      setDescription("");
      setCreateMode(false);
      alert("Playlist created!");
    } catch (err) {
      console.error(err);
      alert("Error creating playlist");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToPlaylist = async (playlistId) => {
    if (!videoId || typeof videoId !== "string") {
      console.error("Invalid or missing videoId:", videoId);
      alert("Error: Video ID is missing. Cannot add to playlist.");
      return;
    }

    try {
      setLoading(true);
      await API.post(`/playlist/add-video/${playlistId}/${videoId}`);
      alert("Video added to playlist!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to add video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={sideMenuStyle} onClick={(e) => e.stopPropagation()}>
      {!createMode ? (
        <>
          <strong style={{ marginBottom: "8px", display: "block" }}>
            📂 Select Playlist
          </strong>
          {playlists.length === 0 ? (
            <p>No playlists found.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {playlists.map((p) => (
                <li key={p._id} style={{ marginBottom: "8px" }}>
                  <button
                    style={buttonStyle}
                    onClick={() => handleAddToPlaylist(p._id)}
                    disabled={loading}
                  >
                    ➕ {p.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
          <button
            style={{ ...buttonStyle, backgroundColor: "#666" }}
            onClick={() => setCreateMode(true)}
          >
            ➕ Create New Playlist
          </button>
        </>
      ) : (
        <>
          <strong style={{ marginBottom: "8px", display: "block" }}>
            🆕 Create Playlist
          </strong>
          <input
            style={inputStyle}
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            style={inputStyle}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            style={buttonStyle}
            onClick={handleCreate}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </button>
          <button
            style={{
              ...buttonStyle,
              backgroundColor: "#666",
              marginTop: "8px",
            }}
            onClick={() => setCreateMode(false)}
          >
            🔙 Back to Playlist List
          </button>
        </>
      )}
    </div>
  );
};

export default AddToPlaylistMenu;