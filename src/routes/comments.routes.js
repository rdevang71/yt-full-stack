import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getVideoComments } from "../controllers/comments.controller";

const router =Router();

router.route("/get-comments").patch(verifyJWT , getVideoComments)

export default router;