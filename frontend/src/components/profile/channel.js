import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../api/user";
import { useNavigate } from "react-router-dom";
import Playlist from "../playlist/playlist.js";
import "./Channel.css";

function Channel() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("playlists");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        setUser(response.data.user);
      } catch (err) {
        console.error("Channel fetch failed", err);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <div className="channel-loading">Loading...</div>;

  return (
    <div className="channel-page">
      <div className="channel-container">
        {/* Cover Image */}
        <div className="channel-cover">
          <img
            src={
              user.coverImage?.includes("cloudinary")
                ? user.coverImage.replace("http://", "https://")
                : "https://images.unsplash.com/photo-1503264116251-35a269479413?fit=crop&w=960&q=80"
            }
            alt="Cover"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1503264116251-35a269479413?fit=crop&w=960&q=80";
            }}
          />
        </div>

        {/* Avatar & Info */}
        <div className="channel-header">
          <img
            className="channel-avatar"
            src={
              user.avatar?.includes("cloudinary")
                ? user.avatar.replace("http://", "https://")
                : "https://i.pravatar.cc/150?img=68"
            }
            alt="Avatar"
            onError={(e) => {
              e.target.src = "https://i.pravatar.cc/150?img=68";
            }}
          />
          <div className="channel-info">
            <h2 className="channel-name">{user.fullName}</h2>
            <p className="channel-username">@{user.username}</p>
            <p className="channel-email">{user.email}</p>
            {user.bio && <p className="channel-bio">{user.bio}</p>}
            <div className="channel-actions">
              <button className="channel-btn">📺 Customise Channel</button>
              <button className="channel-btn">🎛️ Manage Videos</button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="channel-navbar">
          <button
            className={`channel-tab ${activeTab === "playlists" ? "active" : ""}`}
            onClick={() => setActiveTab("playlists")}
          >
            🎵 Playlists
          </button>
          <button
            className={`channel-tab ${activeTab === "videos" ? "active" : ""}`}
            onClick={() => setActiveTab("videos")}
          >
            📹 Videos
          </button>
          <button
            className={`channel-tab ${activeTab === "tweets" ? "active" : ""}`}
            onClick={() => setActiveTab("tweets")}
          >
            🐦 Tweets
          </button>
        </div>

        <hr />

        {/* Playlists Tab */}
        {activeTab === "playlists" && (
          <div className="channel-playlists">
            <Playlist />
          </div>
        )}

        {/* Videos Tab */}
        {activeTab === "videos" && (
          <div className="channel-videos">
            <h3>📹 Uploaded Videos</h3>
            <p style={{ color: "#aaa" }}>Coming soon...</p>
          </div>
        )}

        {/* Tweets Tab */}
        {activeTab === "tweets" && (
          <div className="channel-tweets">
            <h3>🐦 Posted Tweets</h3>
            <p style={{ color: "#aaa" }}>Coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Channel;