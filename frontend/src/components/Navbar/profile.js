// src/components/Profile.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Added for navigation
import { getCurrentUser } from "../../api/user";
import { logoutUser } from "../../api/auth"; // 👈 Directly use logout API
import "./profile.css";

function Profile({ setIsLoggedIn }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getCurrentUser();
        console.log("Fetched User Data:", response.data.user);
        setUser(response.data.user);
      } catch (err) {
        console.error("Profile fetch failed", err);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn?.(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error?.response?.data || error.message);
      alert("Logout failed. Please try again.");
    }
  };

  if (!user) return <div className="text-center mt-5">Loading...</div>;

  const formattedDate = new Date(user.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mt-5">
      <div
        className="card shadow"
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        {/* Cover Image */}
        <div style={{ position: "relative" }}>
          <img
            src={
              user.coverImage && user.coverImage.includes("cloudinary")
                ? user.coverImage.replace("http://", "https://")
                : "https://images.unsplash.com/photo-1503264116251-35a269479413?fit=crop&w=900&q=80"
            }
            alt="Cover"
            style={{
              width: "100%",
              height: "180px",
              objectFit: "cover",
            }}
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1503264116251-35a269479413?fit=crop&w=900&q=80";
            }}
          />

          {/* Avatar Overlay */}
          <img
            className="rounded-circle"
            src={
              user.avatar && user.avatar.includes("cloudinary")
                ? user.avatar.replace("http://", "https://")
                : "https://i.pravatar.cc/150?img=68"
            }
            onError={(e) => {
              e.target.src = "https://i.pravatar.cc/150?img=68";
            }}
            alt="User Avatar"
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
              border: "4px solid white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              position: "absolute",
              bottom: "-60px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#fff",
            }}
          />
        </div>

        {/* Info Section */}
        <div style={{ paddingTop: "80px", padding: "1.5rem" }}>
          <div className="text-center mb-3 mt-5">
            <h3 style={{ color: "#6c5ce7", fontWeight: "bold" }}>
              {user.fullName}
            </h3>
            <p style={{ fontStyle: "italic", color: "#888" }}>
              Member since {formattedDate}
            </p>
          </div>
          <div
            style={{
              fontSize: "17px",
              backgroundColor: "#f9f9f9",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              color: "#333",
              lineHeight: "1.6",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <p style={{ marginBottom: "12px" }}>
              <strong style={{ color: "#000" }}>👤 Username:</strong>{" "}
              <span style={{ color: "#333" }}>{user.username}</span>
            </p>
            <p style={{ marginBottom: "12px" }}>
              <strong style={{ color: "#000" }}>📧 Email:</strong>{" "}
              <span style={{ color: "#333" }}>{user.email}</span>
            </p>
            {user.bio && (
              <p style={{ marginBottom: "12px" }}>
                <strong style={{ color: "#000" }}>📝 Bio:</strong>{" "}
                <span style={{ color: "#333" }}>{user.bio}</span>
              </p>
            )}
            {user.location && (
              <p style={{ marginBottom: "0" }}>
                <strong style={{ color: "#000" }}>📍 Location:</strong>{" "}
                <span style={{ color: "#333" }}>{user.location}</span>
              </p>
            )}
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={handleLogout}
              style={{
                background: "linear-gradient(135deg, #242323ff, #242423ff)",
                color: "#fff",
                border: "none",
                padding: "12px 28px",
                borderRadius: "30px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(255, 78, 80, 0.4)",
                transition: "all 0.3s ease-in-out",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(67, 62, 62, 0.6)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 15px rgba(53, 49, 49, 0.4)";
              }}
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;