import React from "react";

const VideoCard = ({ video }) => {
  return (
    <div className="container-fluid px-0" style={{ marginBottom: "1.8rem" }}>
      <div
        className="d-flex flex-row align-items-stretch shadow-sm"
        style={{
          width: "100%",
          backgroundColor: "#000",
          borderRadius: "18px",
          overflow: "hidden",
          minHeight: "200px",
          
          color: "#fff",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.02)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Thumbnail */}
        <div style={{ flex: "0 0 300px" }}>
          <img
            src={
              video.thumbnail ||
              "https://via.placeholder.com/300x180?text=Thumbnail"
            }
            alt="Thumbnail"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Info Section */}
        <div
          className="p-4 d-flex flex-column justify-content-between"
          style={{ flex: 1 }}
        >
          <div>
            {/* Title */}
            <h3
              className="mb-2"
              style={{
                color: "#ffffff",
                fontSize: "1.5rem",
                fontWeight: "bold",
                lineHeight: "1.3",
              }}
            >
              {video.title}
            </h3>

            {/* Truncated Description */}
            <p
              className="mb-3"
              style={{
                fontSize: "1rem",
                color: "#cccccc",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title={video.description}
            >
              {video.description || "No description available."}
            </p>

            {/* Uploader and Date */}
            <p
              className="mb-1"
              style={{
                fontSize: "1rem",
                color: "#eeeeee",
              }}
            >
              👤 <strong>{video.owner?.username || "Unknown"}</strong>
            </p>
            <p
              className="mb-0"
              style={{
                fontSize: "0.9rem",
                color: "#bbbbbb",
              }}
            >
              📅 {new Date(video.createdAt).toLocaleDateString()} • ⏱️{" "}
              {formatDuration(video.duration)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const formatDuration = (seconds) => {
  if (!seconds || isNaN(seconds)) return "N/A";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

export default VideoCard;
