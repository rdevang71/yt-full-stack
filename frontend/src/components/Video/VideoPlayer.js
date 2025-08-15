import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchVideoById } from "../../api/video";
import { toggleVideoLike } from "../../api/like";

const VideoPlayer = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false); 
  const token = localStorage.getItem("token");

  const getVideo = async () => {
    try {
      const res = await fetchVideoById(videoId, token);
      setVideo(res);
      setLiked(res.isLikedByCurrentUser || false); 
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
    setLiked((prev) => !prev);

    await toggleVideoLike(videoId);

    await getVideo();
  } catch (err) {
    console.error("Failed to toggle like:", err);
    setLiked((prev) => !prev);
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
          backgroundColor: "#111",
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

        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={handleLikeToggle}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: liked ? "#1dd1a1" : "#111",
              color: liked ? "#000" : "#fff",
              border: liked ? "1px solid #1dd1a1" : "1px solid #333",
              borderRadius: "20px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "all 0.3s ease",
              transform: liked ? "scale(1.05)" : "scale(1)",
            }}
          >
            👍 {liked ? "Liked" : "Like"}
          </button>

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