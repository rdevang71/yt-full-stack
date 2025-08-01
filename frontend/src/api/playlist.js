const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../middlewares/auth");
const { createPlaylist } = require("../controllers/playlist.js");

router.post("/create-playlist", verifyJWT, createPlaylist);

module.exports = router;