import { Router } from "express";
import { toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
 } from "../controllers/likes.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/video-like/:videoId").patch(verifyJWT , toggleVideoLike);
router.route("/comment-like/:commentId").patch( verifyJWT , toggleCommentLike);
router.route("/tweet-like/:tweetId").patch( verifyJWT , toggleTweetLike);
router.route("/get-videos").get(verifyJWT , getLikedVideos);

export default router;