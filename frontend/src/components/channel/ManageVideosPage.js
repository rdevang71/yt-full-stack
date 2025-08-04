import React, { useEffect, useState } from "react";
import { fetchUserVideos } from "../../api/video";
import VideoCard from "../Video/VideoCard";

const ManageVideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await fetchUserVideos();
        setVideos(data);
      } catch (err) {
        console.error("Failed to load videos:", err);
      } finally {
        setLoading(false);
      }
    };
    loadVideos();
  }, []);

  const pageStyle = {
    padding: "2rem",
    backgroundColor: "#000",
    minHeight: "100vh",
    color: "#fff",
  };

  const headingStyle = {
    fontSize: "1.8rem",
    marginBottom: "1.5rem",
  };

  const messageStyle = {
    color: "#aaa",
    fontSize: "1rem",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "1.5rem",
    alignItems: "start",
  };

  return (
    <div style={pageStyle}>
      <h2 style={headingStyle}>🎛️ Manage Your Videos</h2>
      {loading ? (
        <p style={messageStyle}>Loading...</p>
      ) : videos.length === 0 ? (
        <p style={messageStyle}>You haven't uploaded any videos yet.</p>
      ) : (
        <div style={gridStyle}>
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageVideosPage;