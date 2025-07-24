import { Router } from "express";
import { toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
 } from "../controllers/subscriptions.controller.js";
 import { verifyJWT } from "../middlewares/auth.middleware.js";


 const router = Router();

 router.route("/toggleSubscription/:channelId").patch(verifyJWT, toggleSubscription)
 
 router.route("/get-subscribers/:channelId").patch(verifyJWT, getUserChannelSubscribers)


 export default router;