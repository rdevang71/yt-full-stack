import React, { useEffect, useState } from "react";
import { fetchLikedVideos } from "../../api/like";
import VideoCard from "../Video/VideoCard.js";

const LikedVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLiked = async () => {
      try {
        const res = await fetchLikedVideos();
        const safeVideos = Array.isArray(res.data)
          ? res.data
              .map((like) => like?.video)
              .filter((video) => video && video._id)
          : [];

        setVideos(safeVideos);
      } catch (err) {
        console.error("Failed to fetch liked videos:", err);
      } finally {
        setLoading(false);
      }
    };

    loadLiked();
  }, []);

  if (loading) return <p className="text-white">Loading liked videos...</p>;

  if (!videos.length)
    return <p className="text-white">No liked videos found.</p>;

  return (
    <div className="liked-videos-page p-4">
      <h2 className="text-white mb-3">Liked Videos</h2>
      <div
        className="liked-videos-grid"
        style={{
          display: "grid",
          gridTemplateColumns:
            videos.length === 1
              ? "repeat(4, 1fr)"
              : "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default LikedVideos;
