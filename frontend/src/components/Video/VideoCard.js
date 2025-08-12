import React from "react";
import { Link } from "react-router-dom";
import FloatingMenu from "./FloatingMenu";

const VideoCard = ({ video }) => {
  const {
    thumbnail = "https://via.placeholder.com/300x180?text=Thumbnail",
    title = "Untitled Video",
    description = "No description available.",
    duration = 0,
    owner,
    createdAt,
    _id,
  } = video || {};

  return (
    <Link to={`/video/${_id}`} style={{ textDecoration: "none", color: "inherit" }}>
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
            position: "relative",
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
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "180px",
              overflow: "hidden",
            }}
          >
            <img
              src={thumbnail}
              alt="Thumbnail"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            {/* Duration */}
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
              {formatDuration(duration)}
            </div>
          </div>

          {/* Info Section */}
          <div
            className="p-3 d-flex flex-column justify-content-between"
            style={{ flex: 1 }}
          >
            <div>
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
                title={title}
              >
                {title}
              </h3>

              <p
                className="mb-2"
                style={{
                  fontSize: "0.95rem",
                  color: "#cccccc",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={description}
              >
                {description}
              </p>

              <p
                className="mb-1"
                style={{
                  fontSize: "0.95rem",
                  color: "#eeeeee",
                }}
              >
                👤 <strong>{owner?.username || "Unknown"}</strong>
              </p>
              <p
                className="mb-0"
                style={{
                  fontSize: "0.85rem",
                  color: "#bbbbbb",
                }}
              >
                📅 {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"} • ⏱️ {formatDuration(duration)}
              </p>
            </div>

            <FloatingMenu videoId={_id} />
          </div>
        </div>
      </div>
    </Link>
  );
};

const formatDuration = (seconds) => {
  if (!seconds || isNaN(seconds)) return "N/A";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

export default VideoCard;