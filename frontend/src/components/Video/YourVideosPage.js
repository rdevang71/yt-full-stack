import React, { useEffect, useState } from "react";
import { fetchUserVideos } from "../../api/video";
import VideoCard from "../Video/VideoCard";

const YourVideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(false);

  useEffect(() => {
    const loadVideos = async () => {
      setLoadingVideos(true);
      try {
        const res = await fetchUserVideos();
        setVideos(res);
      } catch (err) {
        console.error("Failed to fetch user videos", err);
      } finally {
        setLoadingVideos(false);
      }
    };

    loadVideos();
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ color: "#ccc" }}>📹 Your Uploaded Videos</h2>
      {loadingVideos ? (
        <p style={{ color: "#aaa" }}>Loading videos...</p>
      ) : videos.length === 0 ? (
        <p style={{ color: "#aaa" }}>No videos found.</p>
      ) : (
        <div className="video-list-grid">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default YourVideosPage;