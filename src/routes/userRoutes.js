import { Router } from "express";
import {
  userExist,
  registerUser,
  loginUser,
  uploadPicture,
  updateUser,
} from "../controllers/user/index.js";

const router = Router();

// register user router
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/check-user").post(userExist);
router.route("/profile/upload").post(uploadPicture);
router.route("/update").post(updateUser);

export default router;
