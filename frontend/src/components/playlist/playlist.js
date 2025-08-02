import React, { useEffect, useState } from "react";
import { API } from "../../api/auth.js";

const Playlist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await API.get("/playlist/get-userplaylist");
        setPlaylists(res.data.data.playlists);
        setPagination(res.data.data.pagination);
      } catch (err) {
        console.error("Playlist fetch error:", err);
        setError("Could not fetch playlists. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <h1>🗂️ Your Playlists</h1>

      {loading ? (
        <p>Loading your playlists...</p>
      ) : error ? (
        <p>{error}</p>
      ) : playlists.length === 0 ? (
        <p>You don’t have any playlists yet.</p>
      ) : (
        <ul style={{ padding: 0, listStyle: "none" }}>
          {playlists.map((playlist) => (
            <li
              key={playlist._id}
              style={{
                backgroundColor: "#1b1f1c",
                marginBottom: "16px",
                padding: "16px",
                borderRadius: "8px",
              }}
            >
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Playlist;
