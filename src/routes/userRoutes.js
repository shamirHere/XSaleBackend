import { Router } from "express";
import {
  userExist,
  registerUser,
  loginUser,
  uploadPicture,
} from "../controllers/user/index.js";

const router = Router();

// register user router
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/availibility").post(userExist);
router.route("/profile/upload").post(uploadPicture);

export default router;
