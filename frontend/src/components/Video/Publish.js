import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !thumbnail || !videoFile) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("thumbnail", thumbnail);
    formData.append("video", videoFile);

    try {
      setLoading(true);
      const res = await axios.post("/api/publish-video", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      alert(res.data.message || "Video published successfully!");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("Error publishing video.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div
        className="p-4 rounded"
        style={{
          backgroundColor: "#000",
          color: "#fff",
          boxShadow: "0 0 10px rgba(255,255,255,0.1)",
          width: "100%",
          maxWidth: "720px",
        }}
      >
        <h2 className="mb-4 text-center">📤 Publish Your Video</h2>
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div>
            <label className="form-label">Video Title</label>
            <input
              type="text"
              placeholder="Awesome video name..."
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="form-label">Description</label>
            <textarea
              placeholder="What is this video about?"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>

          <div>
            <label className="form-label">Thumbnail Image</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={(e) => setThumbnail(e.target.files[0])}
              required
            />
          </div>

          <div>
            <label className="form-label">Video File</label>
            <input
              type="file"
              accept="video/*"
              className="form-control"
              onChange={(e) => setVideoFile(e.target.files[0])}
              required
            />
          </div>

          <button
            type="submit"
            className=""
            disabled={loading}
            style={{
              backgroundColor: "#000",
              color: "#fff !important",
              fontWeight: "600",
              borderRadius: "8px",
              padding: "10px",
              border: "1px solid #444",
              transition: "background 0.3s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#111";
              e.target.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#000";
              e.target.style.transform = "scale(1)";
            }}
          >
            {loading ? "Publishing..." : "🚀 Publish"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Publish;
