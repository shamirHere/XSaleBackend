import { AsyncHandler, ApiResponse, ApiError } from "../../utils/index.js";
import { User } from "../../models/user/index.js";
import jwt from "jsonwebtoken";

const loginUser = AsyncHandler(async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    throw new ApiError(400, "phone number is required");
  } else if (phoneNumber.length !== 10) {
    throw new ApiError(400, "please enter a valid phone number");
  }
  const user = await User.findOne({ phoneNumber }).populate("location");
  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, "user is not registered , please register"));
  }
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return res
    .status(200)
    .json(new ApiResponse(200, user, token, "user logged in successfully"));
});

export default loginUser;
