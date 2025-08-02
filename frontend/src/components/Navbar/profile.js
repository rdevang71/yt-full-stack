import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../api/user";
import { logoutUser } from "../../api/auth";
import "./profile.css";

function Profile({ setIsLoggedIn }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getCurrentUser();
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

  if (!user)
    return <div className="text-center mt-5 text-white">Loading...</div>;

  const formattedDate = new Date(user.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "960px",
          backgroundColor: "#000",
          borderRadius: "16px",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.6)",
          overflow: "hidden",
          border: "1px solid #222",
        }}
      >
        {/* Cover Image Container */}
        <div style={{ position: "relative", height: "250px", width: "100%" }}>
          <img
            src={
              user.coverImage && user.coverImage.includes("cloudinary")
                ? user.coverImage.replace("http://", "https://")
                : "https://images.unsplash.com/photo-1503264116251-35a269479413?fit=crop&w=960&q=80"
            }
            alt="Cover"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1503264116251-35a269479413?fit=crop&w=960&q=80";
            }}
          />

          {/* Avatar */}
          <img
            src={
              user.avatar && user.avatar.includes("cloudinary")
                ? user.avatar.replace("http://", "https://")
                : "https://i.pravatar.cc/150?img=68"
            }
            alt="User Avatar"
            onError={(e) => {
              e.target.src = "https://i.pravatar.cc/150?img=68";
            }}
            style={{
              width: "130px",
              height: "130px",
              objectFit: "cover",
              borderRadius: "50%",
              border: "4px solid #000",
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
              position: "absolute",
              bottom: "-65px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#000",
            }}
          />
        </div>

        <div style={{ paddingTop: "80px", padding: "2rem" }}>
          {/* Full Name & Join Date */}
          <div className="text-center mb-4">
            <h2
              style={{
                color: "#1dd1a1",
                marginTop:"50px",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              {user.fullName}
            </h2>
            <p style={{ fontStyle: "italic", color: "#ccc" }}>
              Member since {formattedDate}
            </p>
          </div>

          {/* Profile Details */}
          <div
            style={{
              backgroundColor: "#000",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.6)",
              border: "1px solid #333",
              lineHeight: "1.8",
              fontSize: "16px",
              maxWidth: "720px",
              margin: "0 auto",
            }}
          >
            <p>
              <strong style={{ color: "#1dd1a1" }}>👤 Username:</strong>{" "}
              {user.username}
            </p>
            <p>
              <strong style={{ color: "#1dd1a1" }}>📧 Email:</strong>{" "}
              {user.email}
            </p>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => navigate("/channel")}
              style={{
                background: "linear-gradient(135deg, #1b1b1b, #242424)",
                color: "#1dd1a1",
                border: "1px solid #1dd1a1",
                padding: "12px 30px",
                borderRadius: "30px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
                transition: "all 0.3s ease-in-out",
                marginBottom: "1rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.background =
                  "linear-gradient(135deg, #242424, #1b1b1b)";
                e.currentTarget.style.boxShadow =
                  "0 6px 18px rgba(29, 209, 161, 0.6)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.background =
                  "linear-gradient(135deg, #1b1b1b, #242424)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(0, 0, 0, 0.5)";
              }}
            >
              🎛️ Go to Your Channel
            </button>
          </div>

          {/* Logout Button */}
          <div className="mt-5 text-center">
            <button
              onClick={handleLogout}
              style={{
                background: "linear-gradient(135deg, #1dd1a1, #10ac84)",
                color: "#000",
                border: "none",
                padding: "12px 30px",
                borderRadius: "30px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(29, 209, 161, 0.4)",
                transition: "all 0.3s ease-in-out",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(29, 209, 161, 0.6)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 15px rgba(29, 209, 161, 0.4)";
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
