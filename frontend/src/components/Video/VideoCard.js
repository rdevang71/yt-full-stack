import React from "react";

const VideoCard = ({ video }) => {
  return (
    <div
      className="container-fluid px-0"
      style={{ marginBottom: "1.5rem" }}
    >
      <div
        className="d-flex flex-row align-items-stretch shadow-sm"
        style={{
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "12px",
          overflow: "hidden",
          minHeight: "180px",
        }}
      >
        {/* Thumbnail */}
        <div style={{ flex: "0 0 300px" }}>
          <img
            src={video.thumbnail || "https://via.placeholder.com/300x180?text=Thumbnail"}
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
            <h4 className="mb-2 text-truncate">{video.title}</h4>

            {/* Truncated Description */}
            <p
              className="text-muted mb-2"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100%",
              }}
              title={video.description}
            >
              {video.description || "No description available."}
            </p>

            {/* Uploader and Date */}
            <p className="mb-1">
              Uploaded by <strong>{video.owner?.username || "Unknown"}</strong>
            </p>
            <p className="text-muted small mb-0">
              📅 {new Date(video.createdAt).toLocaleDateString()} • ⏱️ {formatDuration(video.duration)}
            </p>
          </div>

          <div>
            <button className="btn btn-sm btn-outline-primary mt-3">
              Watch Now
            </button>
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
