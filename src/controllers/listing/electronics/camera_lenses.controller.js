import { CameraLense } from "../../../models/listing/electronics/index.js";
import { AsyncHandler, ApiResponse } from "../../../utils/index.js";

const createCamera_Lense = AsyncHandler(async (req, res) => {
  const {
    user,
    type,
    brand,
    model,
    additionalInformation,
    media,
    location,
    askingPrice,
  } = req.body;
  try {
    if (!user) {
      return res
        .status(400)
        .json(new ApiResponse(400, user, "id of the user is required"));
    } else if (!type) {
      return res
        .status(400)
        .json(new ApiResponse(400, type, "type is required"));
    } else if (!brand) {
      return res
        .status(400)
        .json(new ApiResponse(400, brand, "brand is required"));
    } else if (!model) {
      return res
        .status(400)
        .json(new ApiResponse(400, model, "model is required"));
    } else if (media.length === 0) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, media, "atleast one image or video is required")
        );
    } else if (!location) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            location,
            "location of the camera/lense is required"
          )
        );
    } else if (!askingPrice) {
      return res
        .status(400)
        .json(new ApiResponse(400, askingPrice, "asking price is required"));
    } else {
      const newCamera_lense = new CameraLense(req.body);
      const savedCamera_lense = await newCamera_lense.save();
      const cameraLense_location_user = await CameraLense.find(
        savedCamera_lense._id
      ).populate({ path: "user", populate: { path: "location" } });
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            cameraLense_location_user,
            "camera / lense listing created successfully"
          )
        );
    }
  } catch (error) {
    console.log(`error while creating a new camera lense ${error}`);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while creating the new camera/lense"
        )
      );
  }
});
const getAllCamera_Lenses = AsyncHandler(async (req, res) => {
  try {
    const cameras_lenses = await CameraLense.find().populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(
        new ApiResponse(200, cameras_lenses, "these are all the camera lenses")
      );
  } catch (error) {
    console.log("error while fetching all the cameras lenses ", error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "error while fetching all the cameras lenses"
        )
      );
  }
});
const getSingleCamera_Lense = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const camera_lense = await CameraLense.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!camera_lense) {
      return res
        .status(404)
        .json(
          new ApiResponse(
            404,
            camera_lense,
            "the camera / lense does not exist"
          )
        );
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          camera_lense,
          "camera / lense fetched successfully"
        )
      );
  } catch (error) {
    console.log("error while fetching single camera / lense ", error);
    return res
      .status(500)
      .json(
        new ApiResponse(500, error, "error while fething single camera / lense")
      );
  }
});
const updateCamera_Lense = AsyncHandler(async (req, res) => {
  const {
    _id,
    type,
    brand,
    model,
    additionalInformation,
    media,
    location,
    askingPrice,
  } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "_id the of the document is required"));
    }
    const updatedCameraLense = await CameraLense.findByIdAndUpdate(
      _id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedCameraLense) {
      return res
        .status(404)
        .json(
          new ApiResponse(404, updatedCameraLense, "camera / lense not found")
        );
    } else if (updatedCameraLense) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedCameraLense,
            "your listing for this camera / lense updated"
          )
        );
    }
  } catch (error) {
    console.log("error while updating the camera / lense  ", error);
    return res
      .status(500)
      .json(
        new ApiResponse(500, "", "erorr while updating the camera / lense")
      );
  }
});
const deleteCamera_Lense = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedCameraLense = await CameraLense.findByIdAndDelete(_id);
    if (!deletedCameraLense) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "camera / lense does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "camera / lense deleted successfully"));
  } catch (error) {
    console.log("error while deleting the camera / lense ", error);
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while camera / lense"
        )
      );
  }
});

export {
  createCamera_Lense,
  getAllCamera_Lenses,
  getSingleCamera_Lense,
  updateCamera_Lense,
  deleteCamera_Lense,
};
