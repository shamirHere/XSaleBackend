import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user/index.js";

const router = Router();

// register user router
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

export default router;
