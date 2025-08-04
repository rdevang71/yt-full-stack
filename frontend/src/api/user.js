import axios from "axios";
import { getToken } from "./auth"; // Assumes this retrieves access token

const API = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const getCurrentUser = async () => {
  const res = await API.get("/users/current-user", authHeader());
  return res.data;
};

export const updateAccountDetails = async (data) => {
  const res = await API.patch("/users/update-account", data, authHeader());
  return res.data;
};

export const changePassword = async (data) => {
  const res = await API.post("/users/change-password", data, authHeader());
  return res.data;
};

export const updateAvatar = async (formData) => {
  const res = await API.patch("/users/avatar", formData, {
    ...authHeader(),
    headers: {
      ...authHeader().headers,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateCoverImage = async (formData) => {
  const res = await API.patch("/users/cover-image", formData, {
    ...authHeader(),
    headers: {
      ...authHeader().headers,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};