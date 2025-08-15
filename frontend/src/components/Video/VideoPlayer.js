import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchVideoById } from "../../api/video";
import { toggleVideoLike } from "../../api/like";

const VideoPlayer = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalLikes, setTotalLikes] = useState(0);
  const [likeClicked, setLikeClicked] = useState(false);
  const token = localStorage.getItem("token");

  const getVideo = async () => {
    try {
      const res = await fetchVideoById(videoId, token);
      setVideo(res);
      setTotalLikes(res.totalLikes || 0);
    } catch (err) {
      console.error("Failed to fetch video:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVideo();
  }, [videoId, token]);

  const handleLikeToggle = async () => {
    try {
      setLikeClicked(true); // trigger animation

      const res = await toggleVideoLike(videoId);
      setTotalLikes(res.data.totalLikes);

      setTimeout(() => setLikeClicked(false), 200); // reset animation
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };

  if (loading) return <p style={{ color: "#fff", padding: "2rem" }}>Loading video...</p>;
  if (!video) return <p style={{ color: "#fff", padding: "2rem" }}>Video not found.</p>;

  const publishedDate = video.createdAt
    ? new Date(video.createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown";

  const { owner } = video;

  return (
    <div style={{ padding: "2rem", color: "#fff", backgroundColor: "#000", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: "1rem" }}>{video.title}</h2>

      <video width="100%" controls style={{ borderRadius: "12px", marginBottom: "1rem" }}>
        <source src={video.videoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#000",
          padding: "1rem",
          borderRadius: "12px",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={owner?.avatar || "https://via.placeholder.com/48?text=User"}
            alt="Channel Avatar"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "1rem",
            }}
          />
          <div>
            <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: "bold", color: "#fff" }}>
              {owner?.username || "Unknown Channel"}
            </p>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "#aaa" }}>
              Published on {publishedDate}
            </p>
          </div>
          <button
            style={{
              marginLeft: "1rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Subscribe
          </button>
        </div>

        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <button
              onClick={handleLikeToggle}
              style={{
                backgroundColor: "#111",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
                fontSize: "2rem",
                transition: "transform 0.2s ease",
                transform: likeClicked ? "scale(1.3)" : "scale(1)",
              }}
            >
             👍🏻
            </button>
            <span style={{ color: "#ccc", fontSize: "0.9rem", marginTop: "0.3rem" }}>
              {totalLikes}
            </span>
          </div>

          <button
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#111",
              color: "#fff",
              border: "1px solid #333",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            💬 Comment
          </button>
        </div>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <p style={{ fontSize: "1rem", color: "#ccc" }}>
          📝 <strong>Description:</strong> {video.description}
        </p>
      </div>
    </div>
  );
};

export default VideoPlayer;
