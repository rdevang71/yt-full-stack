import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  withCredentials: true,
});

export const registerUser = async ({
  fullName,
  username,
  email,
  password,
  avatarFile,
  coverImageFile,
}) => {
  const formData = new FormData();
  formData.append("fullName", fullName);
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);

  if (avatarFile) {
    formData.append("avatar", avatarFile);
  }
  if (coverImageFile) {
    formData.append("coverImage", coverImageFile);
  }

  const response = await API.post("/users/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};


// Log in a user
export const loginUser = async (formData) => {
  const response = await API.post("/users/login", formData);
  return response.data;
};

// Log out the user
export const logoutUser = async () => {
  try {
    const response = await API.post(
      '/users/logout',
      {},
      {
        withCredentials: true, // Ensure cookies (e.g., JWT) are sent
      }
    );
    return response.data;
  } catch (error) {
    console.error("Logout API error:", error);
    throw error;
  }
};

// Get current logged-in user
export const getCurrentUser = async () => {
  const response = await API.get("/users/current-user");
  return response.data;
};


// src/api/tokenUtils.js or inside auth.js

export const getToken = () => {
  return localStorage.getItem("token");
};


