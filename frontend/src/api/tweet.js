// src/api/tweet.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/v1/tweet",
  withCredentials: true,
});

export const fetchAllTweets = async (page = 1, limit = 10) => {
  const res = await API.get(`/all?page=${page}&limit=${limit}`);
  return res.data.data.tweets;
};

export const fetchUserTweets = async (page = 1, limit = 10) => {
  const res = await API.get(`/get-tweets?page=${page}&limit=${limit}`);
  return res.data.data.tweets;
};

export const createTweet = async (tweetData) => {
  const res = await API.post("/create-tweet", tweetData);
  return res.data.data; // populated tweet object
};

export const updateTweet = async (tweetData) => {
  const res = await API.patch("/update-tweet", tweetData);
  return res.data.data;
};

export const deleteTweet = async (tweetId) => {
  const res = await API.delete(`/delete-tweet/${tweetId}`);
  return res.data.data;
};