import React, { useState, useRef, useEffect } from "react";

const TweetCard = ({ tweet }) => {
  const { content, createdAt, owner } = tweet;
  const formattedDate = new Date(createdAt).toLocaleString();
  const contentRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [isTruncatable, setIsTruncatable] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      const lineHeight = parseFloat(getComputedStyle(contentRef.current).lineHeight);
      const contentHeight = contentRef.current.scrollHeight;
      const maxHeight = lineHeight * 5;
      setIsTruncatable(contentHeight > maxHeight);
    }
  }, [content]);

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <img src={owner?.avatar} alt="Avatar" style={styles.avatar} />
        <div>
          <div style={styles.name}>
            {owner?.fullName} (@{owner?.username})
          </div>
          <div style={styles.date}>{formattedDate}</div>
        </div>
      </div>

      <div
        ref={contentRef}
        style={{
          ...styles.content,
          maxHeight: expanded || !isTruncatable ? "none" : "7.5em", // 5 lines × 1.5em line-height
          overflow: expanded || !isTruncatable ? "visible" : "hidden",
        }}
      >
        {content}
      </div>

      {isTruncatable && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          style={styles.toggle}
        >
          {expanded ? "See Less ▲" : "See More ▼"}
        </button>
      )}
    </div>
  );
};

const styles = {
card: {
  backgroundColor: "#111",
  color: "#fff",
  borderRadius: "10px",
  padding: "16px",
  boxShadow: "0 0 6px rgba(0,0,0,0.5)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: "220px",
},
  header: {
    display: "flex",
    gap: "12px",
    marginBottom: "12px",
  },
  avatar: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  name: {
    fontWeight: "600",
    fontSize: "1.1rem",
  },
  date: {
    fontSize: "0.9rem",
    color: "#aaa",
  },
  content: {
    fontSize: "1rem",
    lineHeight: "1.5",
    transition: "max-height 0.3s ease",
  },
  toggle: {
    marginTop: "8px",
    backgroundColor: "transparent",
    color: "#0af",
    border: "none",
    fontSize: "0.95rem",
    cursor: "pointer",
    padding: "0",
  },
};

export default TweetCard;