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

  try {
    // Remove country code (assuming +91) before searching in database
    const normalizedPhoneNumber = phoneNumber.replace(/^\+91/, "");
    const user = await User.findOne({
      phoneNumber: normalizedPhoneNumber,
    }).populate("location");

    if (user) {
      try {
        const auth = admin.auth();
        const userRecord = await auth.getUserByPhoneNumber(phoneNumber);

        return res
          .status(200)
          .json(
            new ApiResponse(
              200,
              [userRecord, user],
              "user exist in both the place"
            )
          );
      } catch (firebaseError) {
        console.error(
          "User found in database but not in Firebase Auth:",
          firebaseError
        );
      }
    } else {
      // User not found in database
      return res
        .status(200)
        .json(new ApiResponse(404, null, "User not found in database"));
    }
  } catch (error) {
    console.error("Error while checking user existence:", error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          "Internal server error: Error checking user existence"
        )
      );
  }
});

export default userExist;
