import { AsyncHandler, ApiResponse } from "../../../utils/index.js";
import { WashingMachine } from "../../../models/listing/index.js";

const createWashingMachine = AsyncHandler(async (req, res) => {
  const {
    user,
    brand,
    machineType,
    capacity,
    additionalInformation,
    media,
    location,
    askingPrice,
  } = req.body;
  try {
    if (!user) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "user id is required"));
    } else if (!brand) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            brand,
            " brand of the washing machine is required"
          )
        );
    } else if (!machineType) {
      return res
        .status(400)
        .json(new ApiResponse(400, machineType, "machine type is required"));
    } else if (!capacity) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            age,
            "capcaity of the washing machine is required"
          )
        );
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
            "location of the washing machine is required"
          )
        );
    } else if (!askingPrice) {
      return res
        .status(400)
        .json(new ApiResponse(400, askingPrice, "asking price is required"));
    } else {
      const newWashingMachine = new WashingMachine(req.body);
      const savedWashingMachine = await newWashingMachine.save();
      const washingMachine_location_user = await WashingMachine.findById(
        washingMachine_location_user._id
      ).populate({
        path: "user",
        populate: {
          path: "location",
        },
      });
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            washingMachine_location_user,
            "new washing machine created successfully"
          )
        );
    }
  } catch (error) {
    console.log(`error while creating new washing machine ${error}`);
    return res
      .status(200)
      .json(
        new ApiResponse(200, error, "error while creating new washing machine")
      );
  }
});
const getAllWashingMachine = AsyncHandler(async (req, res) => {
  try {
    const washingMachines = await WashingMachine.find().populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          washingMachines,
          "these are all the washing machines"
        )
      );
  } catch (error) {
    console.log("error while fetching single washing machine ", error);
    return res
      .status(500)
      .json(
        new ApiResponse(500, error, "error while fething all washing machine")
      );
  }
});
const getSingleWashingMachine = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            _id,
            "please provide the id of the washing machine"
          )
        );
    }
    const washingMachine = await WashingMachine.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!washingMachine) {
      return res
        .status(404)
        .json(
          new ApiResponse(
            404,
            washingMachine,
            "the washingMachine does not exist"
          )
        );
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          washingMachine,
          "washing machine fetched successfully"
        )
      );
  } catch (error) {
    console.log("error while fetching single washing machine ", error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "error while fething single washing machine"
        )
      );
  }
});
const updateWashingMachine = AsyncHandler(async (req, res) => {
  const {
    _id,
    brand,
    machineType,
    capacity,
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
    const updatedWashingMachine = await WashingMachine.findByIdAndUpdate(
      _id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedWashingMachine) {
      return res
        .status(404)
        .json(
          new ApiResponse(
            404,
            updatedWashingMachine,
            "washing machine not found"
          )
        );
    } else if (updatedWashingMachine) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedWashingMachine,
            "your listing for this washing machine updated"
          )
        );
    }
  } catch (error) {
    console.log("error while updating the washing machine", error);
    return res
      .status(500)
      .json(
        new ApiResponse(500, "", "erorr while updating the washing machine")
      );
  }
});
const deleteWashingMachine = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedWashingMachine = await WashingMachine.findByIdAndDelete(_id);
    if (!deletedWashingMachine) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "washing machine does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "washing machine deleted successfully"));
  } catch (error) {
    console.log("error while deleting the washing machine ", error);
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while deleting washing machine"
        )
      );
  }
});
export {
  createWashingMachine,
  getAllWashingMachine,
  getSingleWashingMachine,
  updateWashingMachine,
  deleteWashingMachine,
};
