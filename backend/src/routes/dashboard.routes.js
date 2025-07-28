import { getChannelStats, getChannelVideos } from "../controllers/dashboard.controller.js"
import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/channel-stats").get(verifyJWT,getChannelStats)
router.route("/get-videos").get(verifyJWT, getChannelVideos)

export default router;