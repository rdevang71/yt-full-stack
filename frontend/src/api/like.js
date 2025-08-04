import axios from "axios";
import { getToken } from "./auth"; // Reuses same auth strategy

const API = axios.create({
  baseURL: "http://localhost:8000/api/v1/likes",
  withCredentials: true,
});

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// Toggle like for a video
export const toggleVideoLike = async (videoId) => {
  const res = await API.patch(`/video-like/${videoId}`, null, authHeader());
  return res.data;
};

// Toggle like for a comment
export const toggleCommentLike = async (commentId) => {
  const res = await API.patch(`/comment-like/${commentId}`, null, authHeader());
  return res.data;
};

// Toggle like for a tweet
export const toggleTweetLike = async (tweetId) => {
  const res = await API.patch(`/tweet-like/${tweetId}`, null, authHeader());
  return res.data;
};

// Fetch liked videos for current user
export const fetchLikedVideos = async () => {
  const res = await API.get("/get-videos", authHeader());
  return res.data;
};