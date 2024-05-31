import { AsyncHandler, ApiResponse } from "../../utils/index.js";
import { User } from "../../models/user/index.js";
import admin from "../../firebaseAdmin.js";

const userExist = AsyncHandler(async (req, res) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Phone number is required"));
  }
  const user = await User.findOne({ phoneNumber }).populate("location");
  const userRecord = await admin.auth().getUserByPhoneNumber(phoneNumber);

  console.log(userRecord, "this is user record");

  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, "user is not registered , please register"));
  } else {
    return res.status(302, user, "this user is registered");
  }
});

export default userExist;
