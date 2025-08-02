import React from "react";

function Channel() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0d0d0d",
        color: "#fff",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "#1dd1a1", marginBottom: "1rem" }}>Your Channel</h1>
      <p style={{ fontSize: "1.2rem", color: "#ccc", maxWidth: "600px", textAlign: "center" }}>
        This is where you can display your uploaded videos, playlists, and channel stats.
        You can style this section to match your theme, animate content transitions,
        or add edit/preview actions as needed.
      </p>
      {/* Placeholder for channel content */}
      <div
        style={{
          marginTop: "2rem",
          width: "100%",
          maxWidth: "800px",
          backgroundColor: "#1a1a1a",
          borderRadius: "12px",
          padding: "2rem",
          border: "1px solid #333",
        }}
      >
        <h2 style={{ color: "#1dd1a1" }}>📹 Your Videos</h2>
        <p style={{ color: "#888" }}>No videos uploaded yet. Start building!</p>
      </div>
    </div>
  );
}

export default Channel;