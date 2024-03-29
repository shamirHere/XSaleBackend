import { AsyncHandler, ApiError, ApiResponse } from "../../utils/index.js";
import { User, Location } from "../../models/user/index.js";

const registerUser = AsyncHandler(async (req, res) => {
  const {
    userName,
    phoneNumber,
    profilePicture,
    location: locationData,
  } = req.body;

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
          .json(
            new ApiResponse(409, "User with this phone number already exist")
          );
      }

      const newUser = new User({
        userName,
        phoneNumber,
        profilePicture,
      });
      const savedUser = await newUser.save();
      const userLocation = new Location({
        city: locationData.city,
        state: locationData.state,
        pincode: locationData.pincode,
        country: locationData.country,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        userId: savedUser._id,
      });
      const savedLocation = await userLocation.save();
      const updateUser = await User.findByIdAndUpdate(savedUser._id, {
        location: savedLocation._id,
      });

      const userWithLocation = await User.findById(savedUser._id).populate(
        "location"
      );

      if (!updateUser) {
        return res
          .status(500)
          .json(new ApiResponse(500, "Internal server error"));
      }
      return res
        .status(201)
        .json(
          new ApiResponse(201, "User registered successfully", userWithLocation)
        );
    } catch (error) {
      console.log("this is error", error);
      return res
        .status(500)
        .json(new ApiResponse(500, "Internal server error"));
    }
  }
});

export default registerUser;
