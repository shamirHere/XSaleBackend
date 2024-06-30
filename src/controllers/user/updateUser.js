import { AsyncHandler, ApiResponse, ApiError } from "../../utils/index.js";
import { User } from "../../models/user/index.js";
import admin from "../../firebaseAdmin.js";

const updateUser = AsyncHandler(async (req, res) => {
  console.log("this api is working");
  return res
    .status(200)
    .json(new ApiResponse(200, "working", "api is working"));
});

export default updateUser;
