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
    <div
      className="w-100 px-4 py-4"
      style={{
        backgroundImage: "linear-gradient(90deg, #000, #000)",
        color: "#ffffff",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <h2 className="mb-4 text-center">Latest Videos</h2>
      {loading ? (
        <p className="text-center">Loading videos...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
            padding: "1rem",
          }}
        >
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;