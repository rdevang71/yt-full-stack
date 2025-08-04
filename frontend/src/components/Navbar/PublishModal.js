import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTweet } from "../../api/tweet";

const PublishModal = ({ onClose }) => {
  const [type, setType] = useState("video");
  const [tweetContent, setTweetContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTweetSubmit = async () => {
    if (!tweetContent.trim()) return;
    setLoading(true);
    try {
      await createTweet({ content: tweetContent });
      onClose();
      navigate("/channel");
    } catch (err) {
      console.error("Tweet publish failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.heading}>🎬 Choose what to publish</h2>

        <div style={styles.tabContainer}>
          <button
            onClick={() => setType("video")}
            style={type === "video" ? styles.activeTab : styles.inactiveTab}
          >
            📹 Video
          </button>
          <button
            onClick={() => setType("tweet")}
            style={type === "tweet" ? styles.activeTab : styles.inactiveTab}
          >
            🗨️ Tweet
          </button>
        </div>

        {type === "video" ? (
          <div style={styles.section}>
            <p style={{ color: "#bbb", marginBottom: "12px" }}>
              Ready to share a new video?
            </p>
            <button
              onClick={() => {
                onClose();
                navigate("/publish");
              }}
              style={styles.actionButton}
            >
              Go to Video Publisher
            </button>
          </div>
        ) : (
          <div style={styles.section}>
            <textarea
              rows="4"
              value={tweetContent}
              onChange={(e) => setTweetContent(e.target.value)}
              placeholder="What's happening?"
              style={styles.textarea}
            />
            <button
              onClick={handleTweetSubmit}
              style={{
                ...styles.actionButton,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "wait" : "pointer",
              }}
              disabled={loading}
            >
              {loading ? "Publishing..." : "Publish Tweet"}
            </button>
          </div>
        )}

        <button onClick={onClose} style={styles.closeButton}>
          ❌ Close
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, width: "100%", height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex", justifyContent: "center", alignItems: "center",
    animation: "fadeInOverlay 0.3s ease",
    zIndex: 999,
  },
  modal: {
    backgroundColor: "#000", color: "#fff",
    padding: "28px", borderRadius: "10px",
    minWidth: "360px", maxWidth: "90vw",
    boxShadow: "0 0 40px rgba(0,0,0,0.6)",
    animation: "scaleIn 0.35s ease",
  },
  heading: {
    fontSize: "20px", fontWeight: "600",
    marginBottom: "20px",
    textAlign: "center",
  },
  tabContainer: {
    display: "flex", gap: "12px", marginBottom: "20px",
  },
  activeTab: {
    flex: 1,
    backgroundColor: "#333", color: "#0af",
    padding: "10px", borderRadius: "6px",
    border: "1px solid #0af", fontWeight: "500",
    transition: "all 0.3s ease",
  },
  inactiveTab: {
    flex: 1,
    backgroundColor: "#000", color: "#ccc",
    padding: "10px", borderRadius: "6px",
    border: "1px solid #444", fontWeight: "400",
    transition: "all 0.3s ease",
  },
  section: {
    marginBottom: "20px",
  },
  textarea: {
    width: "100%", padding: "10px",
    backgroundColor: "#111", color: "#fff",
    border: "1px solid #444", borderRadius: "6px",
    resize: "none", fontSize: "1rem", marginBottom: "16px",
    boxShadow: "inset 0 0 4px rgba(0,0,0,0.4)",
  },
  actionButton: {
    padding: "10px 16px",
    backgroundColor: "#000", color: "#fff",
    border: "1px solid skyblue", borderRadius: "6px",
    fontWeight: "500", transition: "background 0.3s ease",
    width: "100%",
  },
  closeButton: {
    background: "none", border: "none",
    color: "#aaa", cursor: "pointer",
    fontSize: "14px", display: "block",
    margin: "0 auto", marginTop: "12px",
    transition: "color 0.3s ease",
  },

  // Optional keyframe animation definitions
  "@keyframes fadeInOverlay": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  "@keyframes scaleIn": {
    from: { transform: "scale(0.9)", opacity: 0 },
    to: { transform: "scale(1)", opacity: 1 },
  },
};

export default PublishModal;