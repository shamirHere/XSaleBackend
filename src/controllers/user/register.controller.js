import { AsyncHandler, ApiError, ApiResponse } from "../../utils/index.js";
import { User } from "../../models/user/index.js";

const registerUser = AsyncHandler(async (req, res) => {
  const { userName, phoneNumber, profilePicture } = req.body;

  if (!userName) {
    return res.status(400).json(new ApiResponse(400, "User name is required"));
  } else if (!phoneNumber) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Phone number is required"));
  } else {
    try {
      const existedUser = await User.findOne({ phoneNumber });
      if (existedUser) {
        console.log(existedUser, "this user already exits");
        return res
          .status(409)
          .json(new ApiResponse(409, "User with phone number"));
      }

      const user = await User.create({
        userName,
        phoneNumber,
        profilePicture,
      });
      const createdUser = await User.find({ phoneNumber });
      if (!createdUser) {
        return res
          .status(500)
          .json(new ApiResponse(500, "Internal server error"));
      }
      return res
        .status(201)
        .json(new ApiResponse(201, "User registered successfully", user));
    } catch (error) {
      return res
        .status(500)
        .json(new ApiResponse(500, "Internal server error"));
    }
  }
});

export default registerUser;
