import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../api/auth.js";
import VideoCard from "../Video/VideoCard.js"

const PlaylistDetails = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const res = await API.get(`/playlist/get-playlist/${playlistId}`);
        setPlaylist(res.data.data);
      } catch (err) {
        console.error("Failed to load playlist:", err);
        setError("Could not load playlist. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [playlistId]);

  return (
    <div style={{ padding: "2rem", backgroundColor: "#000", color: "#fff" }}>
      {loading ? (
        <p>Loading playlist...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h1>{playlist.name}</h1>
          <p style={{ color: "#aaa" }}>{playlist.description}</p>
          <p>Created by: {playlist.owner?.username}</p>
          <p>Total Videos: {playlist.videos?.length || 0}</p>

          <div
            style={{
              marginTop: "2rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {playlist.videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PlaylistDetails;