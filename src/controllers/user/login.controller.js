import { AsyncHandler, ApiResponse, ApiError } from "../../utils/index.js";
import { User } from "../../models/user/index.js";

const loginUser = AsyncHandler(async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    throw new ApiError(400, "phone number is required");
  } else if (phoneNumber.length !== 10) {
    throw new ApiError(400, "please enter a valid phone number");
  }
  const user = await User.findOne({ phoneNumber });
  if (!user) {
    throw new ApiError(404, "user is not registered , please register");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "user logged in successfully"));
});
export default loginUser;
