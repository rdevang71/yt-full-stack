import React, { useEffect, useState } from "react";
import { API } from "../../api/auth.js";
import VideoCard from "../Video/VideoCard.js";
import PlaylistCard from "./PlaylistCard.js";

const Playlist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [videos, setVideos] = useState([]);
  const [videoLoading, setVideoLoading] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await API.get("/playlist/get-userplaylist");
        setPlaylists(res.data.data.playlists);
      } catch (err) {
        console.error("Playlist fetch error:", err);
        setError("Could not fetch playlists. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  const handleSelectPlaylist = async (playlistId) => {
    setSelectedPlaylist(playlistId);
    setVideos([]);
    setVideoLoading(true);
    try {
      const res = await API.get(`/playlist/get-playlist/${playlistId}`);
      setVideos(res.data.data.videos || []);
    } catch (err) {
      console.error("Video fetch error:", err);
      setError("Could not load videos for this playlist.");
    } finally {
      setVideoLoading(false);
    }
  };

  const handleDeletePlaylist = (playlistId) => {
    setPlaylists((prev) => prev.filter((p) => p._id !== playlistId));
    if (selectedPlaylist === playlistId) setSelectedPlaylist(null);
  };

  const handleUpdatePlaylist = (playlistId, name, description) => {
    setPlaylists((prev) =>
      prev.map((p) =>
        p._id === playlistId ? { ...p, name, description } : p
      )
    );
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#000", color: "#fff", minHeight: "100vh" }}>
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
            <PlaylistCard
              key={playlist._id}
              playlist={playlist}
              isSelected={selectedPlaylist === playlist._id}
              onSelect={handleSelectPlaylist}
              onDelete={handleDeletePlaylist}
              onUpdate={handleUpdatePlaylist}
            />
          ))}
        </ul>
      )}

      {selectedPlaylist && (
        <div style={{ marginTop: "2.5rem" }}>
          <h2>🎞 Videos in Playlist</h2>
          {videoLoading ? (
            <p>Loading videos...</p>
          ) :(
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