// src/components/Video/VideoPlayer.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchVideoById } from "../../api/video"; // You need to implement this API call

const VideoPlayer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getVideo = async () => {
      try {
        const res = await fetchVideoById(id);
        setVideo(res);
      } catch (err) {
        console.error("Failed to fetch video:", err);
      } finally {
        setLoading(false);
      }
    };
    getVideo();
  }, [id]);

  if (loading) return <p>Loading video...</p>;
  if (!video) return <p>Video not found.</p>;

  return (
    <div style={{ padding: "2rem", color: "#fff", backgroundColor: "#000", minHeight: "100vh" }}>
      <h2>{video.title}</h2>
      <video width="100%" controls>
        <source src={video.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>{video.description}</p>
    </div>
  );
};

export default VideoPlayer;