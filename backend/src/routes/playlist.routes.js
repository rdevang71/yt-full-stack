import {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
} from "../controllers/playlist.controller.js"
import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-playlist").post(verifyJWT, createPlaylist)
router.route("/get-userplaylist").get(verifyJWT, getUserPlaylists)
router.route("/get-playlist/:playlistId").get(verifyJWT, getPlaylistById)
router.route("/add-video/:playlistId/:videoId").post(verifyJWT, addVideoToPlaylist)
router.route("/remove-video/:playlistId/:videoId").patch(verifyJWT, removeVideoFromPlaylist)
router.route("/delete-playlist/:playlistId").delete(verifyJWT, deletePlaylist)
router.route("/update-playlist/:playlistId").patch(verifyJWT, updatePlaylist)

export default router;