import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchVideoById } from "../../api/video";

const VideoPlayer = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getVideo = async () => {
      try {
        const res = await fetchVideoById(videoId, token);
        setVideo(res);
      } catch (err) {
        console.error("Failed to fetch video:", err);
      } finally {
        setLoading(false);
      }
    };
    getVideo();
  }, [videoId, token]);

  if (loading) return <p style={{ color: "#fff", padding: "2rem" }}>Loading video...</p>;
  if (!video) return <p style={{ color: "#fff", padding: "2rem" }}>Video not found.</p>;

  return (
    <div style={{ padding: "2rem", color: "#fff", backgroundColor: "#000", minHeight: "100vh" }}>
      <h2>{video.title}</h2>
      <video width="100%" controls>
        <source src={video.videoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p style={{ marginTop: "1rem", color: "#ccc" }}>{video.description}</p>
    </div>
  );
};

export default VideoPlayer;