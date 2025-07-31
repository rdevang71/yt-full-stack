import React from "react";

const VideoCard = ({ video }) => {
  return (
    <div className="container-fluid px-0" style={{ marginBottom: "1.8rem" }}>
      <div
        className="d-flex flex-column shadow-sm"
        style={{
          width: "100%",
          backgroundColor: "#000",
          borderRadius: "18px",
          overflow: "hidden",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          color: "#fff",
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
        {/* Thumbnail on top */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "180px",
            overflow: "hidden",
          }}
        >
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

          {/* Duration Overlay */}
          <div
            style={{
              position: "absolute",
              bottom: "8px",
              right: "8px",
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              color: "#fff",
              fontSize: "0.8rem",
              fontWeight: "bold",
              padding: "2px 6px",
              borderRadius: "4px",
            }}
          >
            {formatDuration(video.duration)}
          </div>
        </div>

        {/* Info Section below */}
        <div
          className="p-3 d-flex flex-column justify-content-between"
          style={{ flex: 1 }}
        >
          <div>
            {/* Title */}
            <h3
              className="mb-2"
              style={{
                color: "#ffffff",
                fontSize: "1.3rem",
                fontWeight: "bold",
                lineHeight: "1.3",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title={video.title}
            >
              {video.title}
            </h3>

            {/* Truncated Description */}
            <p
              className="mb-2"
              style={{
                fontSize: "0.95rem",
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
                fontSize: "0.95rem",
                color: "#eeeeee",
              }}
            >
              👤 <strong>{video.owner?.username || "Unknown"}</strong>
            </p>
            <p
              className="mb-0"
              style={{
                fontSize: "0.85rem",
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
