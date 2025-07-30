// src/components/Home/Home.js
import React, { useEffect, useState } from "react";
import { fetchPublishedVideos } from "../../api/video";
import VideoCard from "../Video/VideoCard";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const res = await fetchPublishedVideos();
        setVideos(Array.isArray(res) ? res : []);
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      } finally {
        setLoading(false);
      }
    };

    getVideos();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Latest Videos</h2>
      {loading ? (
        <p className="text-center">Loading videos...</p>
      ) : (
        <div className="d-flex flex-column gap-4">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
