// src/components/Profile.js
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../api/user";
import Logout from "../Auth/Logout.js";
import "./profile.css";

function Profile({ setIsLoggedIn }) {
  const [user, setUser] = useState(null);

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
          {/* Moved name and join date here so they show below avatar */}
          <div className="text-center mb-3 mt-5">
            <h3 style={{ color: "#6c5ce7", fontWeight: "bold" }}>
              {user.fullName}
            </h3>
            <p style={{ fontStyle: "italic", color: "#888" }}>
              Member since {formattedDate}
            </p>
          </div>

          <div style={{ fontSize: "16px" }}>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            {user.bio && (
              <p>
                <strong>Bio:</strong> {user.bio}
              </p>
            )}
            {user.location && (
              <p>
                <strong>Location:</strong> {user.location}
              </p>
            )}
          </div>

          <div className="mt-4 text-center">
            <Logout setIsLoggedIn={setIsLoggedIn} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
