const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../middlewares/auth");

const {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
} = require("../controllers/playlist.js");

// Create a new playlist
router.post("/create-playlist", verifyJWT, createPlaylist);

// Get all playlists for the logged-in user
router.get("/get-userplaylist", verifyJWT, getUserPlaylists);

// Get a specific playlist by ID
router.get("/get-playlist/:playlistId", verifyJWT, getPlaylistById);

// Add a video to a playlist
router.post("/add-video/:playlistId/:videoId", verifyJWT, addVideoToPlaylist);

// Remove a video from a playlist
router.patch("/remove-video/:playlistId/:videoId", verifyJWT, removeVideoFromPlaylist);

// Delete a playlist
router.delete("/delete-playlist/:playlistId", verifyJWT, deletePlaylist);

// Update a playlist
router.patch("/update-playlist/:playlistId", verifyJWT, updatePlaylist);

module.exports = router;