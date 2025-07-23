import { Router } from "express";
import {
  getAllVideos,
  getVideoById,
  deleteVideo,
  togglePublishStatus,
  publishAVideo,
  updateVideo,
} from "../controllers/video.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/videos").get(verifyJWT, getAllVideos);

router.route("/publish-video").post(
  verifyJWT,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  publishAVideo
);

router.route("/video/:videoId").get(verifyJWT, getVideoById);

router
  .route("/video/:videoId")
  .put(
    verifyJWT,
    upload.fields([{ name: "thumbnail", maxCount: 1 }]),
    updateVideo
  );

router.route("/video/:videoId").delete(verifyJWT, deleteVideo);

router
  .route("/video/:videoId/toggle-publish")
  .patch(verifyJWT, togglePublishStatus);

export default router;
