import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:8000/api/v1/videos",
  withCredentials: true, 
});
export const fetchPublishedVideos = async (page = 1, limit = 10) => {
  const res = await API.get(`/videos?page=${page}&limit=${limit}`);
  return res.data.data.videos;
};

export const fetchUserVideos = async (token, page = 1, limit = 10) => {
  const res = await API.get(`/Uservideos?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data.videos;
};

export const fetchVideoById = async (id, token) => {
  const res = await API.get(`/video/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data.video;
};