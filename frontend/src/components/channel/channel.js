import React, { useEffect, useState } from "react";
import {
  getCurrentUser,
  updateAccountDetails,
  changePassword,
  updateAvatar,
  updateCoverImage,
} from "../../api/user.js";
import { fetchUserVideos } from "../../api/video.js";
import { fetchUserTweets } from "../../api/tweet.js";
import { useNavigate } from "react-router-dom";
import Playlist from "../playlist/playlist.js";
import VideoCard from "../Video/VideoCard.js";
import TweetCard from "../Tweet/Tweetcard.js";
import ChannelSettingsModal from "./ChannelSettingsModal.js";
import "./Channel.css";

function Channel() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("playlists");
  const [videos, setVideos] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [loadingTweets, setLoadingTweets] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
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

  useEffect(() => {
    if (activeTab === "videos") {
      const loadVideos = async () => {
        setLoadingVideos(true);
        try {
          const res = await fetchUserVideos();
          setVideos(res);
        } catch (err) {
          console.error("Failed to fetch user videos", err);
        } finally {
          setLoadingVideos(false);
        }
      };
      loadVideos();
    }

    if (activeTab === "tweets") {
      const loadTweets = async () => {
        setLoadingTweets(true);
        try {
          const res = await fetchUserTweets();
          setTweets(res);
        } catch (err) {
          console.error("Failed to fetch user tweets", err);
        } finally {
          setLoadingTweets(false);
        }
      };
      loadTweets();
    }
  }, [activeTab]);

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
              <button
                className="channel-btn"
                onClick={() => setShowSettings(true)}
              >
                📺 Customise Channel
              </button>
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
            🗨️ Tweets
          </button>
        </div>

        <hr />

        {/* Playlists */}
        {activeTab === "playlists" && (
          <div className="channel-playlists">
            <Playlist />
          </div>
        )}

        {/* Videos */}
        {activeTab === "videos" && (
          <div className="channel-videos">
            <h3>📹 Uploaded Videos</h3>
            {loadingVideos ? (
              <p style={{ color: "#aaa" }}>Loading videos...</p>
            ) : videos.length === 0 ? (
              <p style={{ color: "#aaa" }}>No videos found.</p>
            ) : (
              <div className="video-list-grid">
                {videos.map((video) => (
                  <VideoCard key={video._id} video={video} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tweets */}
        {activeTab === "tweets" && (
          <div className="channel-tweets">
            <h3>🗨️ Posted Tweets</h3>
            {loadingTweets ? (
              <p style={{ color: "#aaa" }}>Loading tweets...</p>
            ) : tweets.length === 0 ? (
              <p style={{ color: "#aaa" }}>No tweets posted yet.</p>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: "20px",
                }}
              >
                {tweets.map((tweet) => (
                  <TweetCard key={tweet._id} tweet={tweet} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <ChannelSettingsModal user={user} onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}

export default Channel;