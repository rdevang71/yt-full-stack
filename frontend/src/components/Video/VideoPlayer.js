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

  // Format published date
  const publishedDate = video.createdAt
    ? new Date(video.createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown";

  return (
    <div style={{ padding: "2rem", color: "#fff", backgroundColor: "#000", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: "1rem" }}>{video.title}</h2>

      <video width="100%" controls style={{ borderRadius: "12px", marginBottom: "1rem" }}>
        <source src={video.videoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={{ marginTop: "1rem" }}>
        <p style={{ fontSize: "1rem", color: "#ccc", marginBottom: "0.5rem" }}>
          📅 <strong>Published on:</strong> {publishedDate}
        </p>
        <p style={{ fontSize: "1rem", color: "#ccc" }}>
          📝 <strong>Description:</strong> {video.description}
        </p>
      </div>
    </div>
  );
};

export default VideoPlayer;