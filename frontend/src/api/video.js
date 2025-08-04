import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/v1/videos",
  withCredentials: true,
});

export const fetchPublishedVideos = async (page = 1, limit = 10) => {
  const res = await API.get(`/videos?page=${page}&limit=${limit}`);
  return res.data.data.videos;
};

export const fetchUserVideos = async (page = 1, limit = 10) => {
  const res = await API.get(`/Uservideos?page=${page}&limit=${limit}`);
  return res.data.data.videos;
};

