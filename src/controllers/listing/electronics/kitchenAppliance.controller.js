import { AsyncHandler, ApiResponse } from "../../../utils/index.js";
import { KitchenAppliance } from "../../../models/listing/electronics/index.js";

const createKitchenAppliance = AsyncHandler(async (req, res) => {
  const { user, applianceName, brand, media, location, askingPrice } = req.body;
  try {
    if (!user) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "user id is required"));
    } else if (!applianceName) {
      return res
        .status(400)
        .json(new ApiResponse(400, applianceName, "applianceName is required"));
    } else if (!brand) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            brand,
            "brand of the KitchenAppliance is required"
          )
        );
    } else if (media.length) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            media,
            "at least one video or image of the applicance is required"
          )
        );
    } else if (!location) {
      return res
        .status(400)
        .json(new ApiResponse(400, location, "location is required"));
    } else if (!askingPrice) {
      return res
        .status(400)
        .json(new ApiResponse(400, askingPrice, "asking price is required"));
    } else {
      const newKitchenAppliance = new KitchenAppliance(req.body);
      const savedKitchenAppliance = await newKitchenAppliance.save();
      const kitchenAppliance_location_user = await KitchenAppliance.find(
        savedKitchenAppliance._id
      ).populate({ path: "user", populate: { path: "location" } });
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            kitchenAppliance_location_user,
            "kitchen appliance listing created successfully"
          )
        );
    }
  } catch (error) {
    console.log(`error while creating a new kitchen appliance ${error}`);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while creating the new new kitchen appliance"
        )
      );
  }
});
const getAllKitchenAppliance = AsyncHandler(async (req, res) => {
  try {
    const kitchenAppliances = await KitchenAppliance.find().populate({
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
          kitchenAppliances,
          "these are all the kitchen appliance fans"
        )
      );
  } catch (error) {
    console.log("error while fetching all the kitchen appliance", error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "error while fetching all the kitchen appliance"
        )
      );
  }
});
const getSingleKitchenAppliance = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const kitchenAppliance = await KitchenAppliance.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!kitchenAppliance) {
      return res
        .status(404)
        .json(
          new ApiResponse(
            404,
            kitchenAppliance,
            "the kitchena appliance does not exist"
          )
        );
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          kitchenAppliance,
          "kitchen appliance fetched successfully"
        )
      );
  } catch (error) {
    console.log("error while fetching single kitchen appliance", error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "error while fething single kitchen appliance"
        )
      );
  }
});
const updateKitchenAppliance = AsyncHandler(async (req, res) => {
  const { _id, applianceName, brand, media, location, askingPrice } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "_id the of the document is required"));
    }
    const updatedKitchenAppliance = await KitchenAppliance.findByIdAndUpdate(
      _id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedKitchenAppliance) {
      return res
        .status(404)
        .json(
          new ApiResponse(
            404,
            updatedKitchenAppliance,
            "kitchen appliance not found"
          )
        );
    } else if (updatedKitchenAppliance) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedKitchenAppliance,
            "your listing for this KitchenAppliance updated"
          )
        );
    }
  } catch (error) {
    console.log("error while updating the kitchen appliance", error);
    return res
      .status(500)
      .json(
        new ApiResponse(500, "", "erorr while updating the kitchen appliance")
      );
  }
});
const deleteKitchenAppliance = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedKitchenAppliance = await KitchenAppliance.findByIdAndDelete(
      _id
    );
    if (!deletedKitchenAppliance) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "kitchen appliance does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "kitchen appliance deleted successfully"));
  } catch (error) {
    console.log("error while deleting the kitchen appliance ", error);
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while deleting kitchen appliance"
        )
      );
  }
});

export {
  createKitchenAppliance,
  getAllKitchenAppliance,
  getSingleKitchenAppliance,
  updateKitchenAppliance,
  deleteKitchenAppliance,
};
