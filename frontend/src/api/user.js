import axios from 'axios';
import { getToken } from './auth'; // This function should return token from localStorage or cookies

const API = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  withCredentials: true,
});

export const getCurrentUser = async () => {
  const token = getToken(); // retrieve token
  const res = await API.get('/users/current-user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
