import { AsyncHandler, ApiError, ApiResponse } from "../../utils/index.js";
import { User, Location } from "../../models/user/index.js";
import admin from "../../firebaseAdmin.js";

const registerUser = AsyncHandler(async (req, res) => {
  const {
    userName,
    phoneNumber,
    profilePicture,
    currentAddress,
    location: locationData,
    idToken,
  } = req.body;

  try {
  } catch (error) {}

  if (!userName) {
    return res.status(400).json(new ApiResponse(400, "User name is required"));
  } else if (!idToken) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, "Please provide the firebase token of the user")
      );
  } else if (!phoneNumber) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Phone number is required"));
  } else if (!currentAddress) {
    return res
      .status(400)
      .json(new ApiResponse(400, "user readable address is required"));
  } else {
    try {
      const decodeToken = admin.auth().verifyIdToken(idToken);
      const uid = (await decodeToken).uid;
      // const updateUserParams = {
      //   displayName: userName,
      //   phoneNumber: `+91${phoneNumber}`,
      // };
      const updateInFirebabse = await admin.auth().updateUser(uid, {
        displayName: userName,
        phoneNumber: `+91${phoneNumber}`,
      });

      if (!updateInFirebabse) {
        return res
          .status(400)
          .json(
            new ApiResponse(
              400,
              "Error while updating the user name in firebase"
            )
          );
      }

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
        currentAddress,
      });
      const savedUser = await newUser.save();
      const userLocation = new Location({
        city: locationData.city,
        state: locationData.state,
        pincode: locationData.pincode,
        country: locationData.country,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        fullAddress: currentAddress,
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
