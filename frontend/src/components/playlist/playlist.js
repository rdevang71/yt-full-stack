import React, { useEffect, useState } from "react";
import { API } from "../../api/auth.js";
import { useNavigate } from "react-router-dom";
import VideoCard from "../Video/VideoCard.js"; 




const Playlist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [videos, setVideos] = useState([]);
  const [videoLoading, setVideoLoading] = useState(false);
  const navigate = useNavigate();

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

  const handlePlaylistClick = async (playlistId) => {
    setSelectedPlaylist(playlistId);
    setVideos([]);
    setVideoLoading(true);
    try {
      const res = await API.get(`/playlist/get-playlist/${playlistId}`);
      const playlist = res.data.data;
      setVideos(playlist.videos || []);
    } catch (err) {
      console.error("Video fetch error:", err);
      setError("Could not load videos for this playlist.");
    } finally {
      setVideoLoading(false);
    }
  };

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
              onClick={() => navigate(`/playlist/${playlist._id}`)}
              style={{
                backgroundColor: "#1b1f1c",
                marginBottom: "16px",
                padding: "16px",
                borderRadius: "8px",
                cursor: "pointer",
                border:
                  selectedPlaylist === playlist._id
                    ? "2px solid #1dd1a1"
                    : "none",
                transition: "border 0.3s ease",
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

      {/* Video cards for selected playlist */}
      {selectedPlaylist && (
        <div style={{ marginTop: "2.5rem" }}>
          <h2>🎞 Videos in Playlist</h2>
          {videoLoading ? (
            <p>Loading videos...</p>
          ) : videos.length === 0 ? (
            <p>No videos added yet.</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1.5rem",
                marginTop: "1rem",
              }}
            >
              {videos.map((video) => (
                <VideoCard key={video._id} video={video} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Playlist;