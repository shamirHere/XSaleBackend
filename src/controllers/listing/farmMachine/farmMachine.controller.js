import { AsyncHandler, ApiResponse } from "../../../utils/index.js";
import Item from "../../../models/listing/items/items.models.js";
import { FarmMachine } from "../../../models/listing/farmMachine/index.js";

const createFarmMachine = AsyncHandler(async (req, res) => {
  const {
    user,
    productType,
    machineName,
    additionalInformation,
    media,
    location,
    askingPrice,
  } = req.body;

  try {
    if (!user) {
      return res
        .status(400)
        .json(new ApiResponse(400, user, "user id is required"));
    } else if (!productType) {
      return res
        .status(400)
        .json(new ApiResponse(400, productType, "product type is required"));
    } else if (!machineName) {
      return res
        .status(400)
        .json(new ApiResponse(400, brand, "machine name is required"));
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
            "location of the farm machine is required"
          )
        );
    } else if (!askingPrice) {
      return res
        .status(400)
        .json(new ApiResponse(400, askingPrice, "asking price is required"));
    } else {
      const newFarmMachine = new FarmMachine(req.body);
      const savedFarmMachine = await newFarmMachine.save();
      const farmMachine_location_user = await FarmMachine.findById(
        savedFarmMachine._id
      ).populate({
        path: "user",
        populate: {
          path: "location",
        },
      });
      const item = new Item({
        item: farmMachine_location_user,
        location: farmMachine_location_user[0].location,
      });
      const savedInItems = await item.save();
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            farmMachine_location_user,
            "new farm  machine created successfully"
          )
        );
    }
  } catch (error) {
    console.log(`error while creating new farm machine ${error}`);
    return res
      .status(200)
      .json(
        new ApiResponse(200, error, "error while creating new farm machine")
      );
  }
});

const getAllFarmMachine = AsyncHandler(async (req, res) => {
  try {
    const farmMachines = await FarmMachine.find().populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(
        new ApiResponse(200, farmMachines, "these are all the farm machines")
      );
  } catch (error) {
    console.log("error while fetching all farm machine ", error);
    return res
      .status(500)
      .json(
        new ApiResponse(500, error, "error while fething all farm machine")
      );
  }
});

const getSingleFarmMachine = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the farm machine")
        );
    }
    const farmMachine = await FarmMachine.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!farmMachine) {
      return res
        .status(404)
        .json(new ApiResponse(404, farmMachine, "the farm does not exist"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, farmMachine, "farm machine fetched successfully")
      );
  } catch (error) {
    console.log("error while fetching single farm machine ", error);
    return res
      .status(500)
      .json(
        new ApiResponse(500, error, "error while fething single farm machine")
      );
  }
});

const updateFarmMachine = AsyncHandler(async (req, res) => {
  const {
    _id,
    machineName,
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
    const updatedFarmMachine = await FarmMachine.findByIdAndUpdate(
      _id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedFarmMachine) {
      return res
        .status(404)
        .json(
          new ApiResponse(404, updatedFarmMachine, "farm machine not found")
        );
    } else if (updatedFarmMachine) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedFarmMachine,
            "your listing for this farm machine updated"
          )
        );
    }
  } catch (error) {
    console.log("error while updating the farm machine", error);
    return res
      .status(500)
      .json(new ApiResponse(500, "", "erorr while updating the farm machine"));
  }
});

const deleteFarmMachine = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedFarmMachine = await FarmMachine.findByIdAndDelete(_id);
    if (!deletedFarmMachine) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "farm machine does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "farm machine deleted successfully"));
  } catch (error) {
    console.log("error while deleting the farm machine ", error);
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while deleting farm machine"
        )
      );
  }
});

export {
  createFarmMachine,
  getAllFarmMachine,
  getSingleFarmMachine,
  updateFarmMachine,
  deleteFarmMachine,
};
