import { Router } from "express";
import {
  fetchMessageList,
  createMessage,
} from "../controllers/user/messagedUser.controller.js";
const router = Router();

router.route("/fetch/messageList/:id").get(fetchMessageList);
router.route("/sendMessage").post(createMessage);

export default router;
