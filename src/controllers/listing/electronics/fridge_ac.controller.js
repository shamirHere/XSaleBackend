import { AsyncHandler, ApiResponse } from "../../../utils/index.js";
import { FridgeAc } from "../../../models/listing/electronics/index.js";
import Item from "../../../models/listing/items/items.models.js";
import { Electronics } from "../../../models/category/index.js";

const createFridgeAc = AsyncHandler(async (req, res) => {
  const {
    user,
    productType,
    brand,
    model,
    capacity,
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
    } else if (!brand) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, brand, " brand of the FridgeAc is required")
        );
    } else if (!model) {
      return res
        .status(400)
        .json(new ApiResponse(400, model, "model of the FridgeAc is required"));
    } else if (!capacity) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, age, "capcaity of the FridgeAc is required")
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
          new ApiResponse(400, location, "location of the FridgeAc is required")
        );
    } else if (!askingPrice) {
      return res
        .status(400)
        .json(new ApiResponse(400, askingPrice, "asking price is required"));
    } else {
      const newFridgeAc = new FridgeAcAc(req.body);
      const savedFridgeAc = await newFridgeAcAc.save();
      const FridgeAc_location_user = await FridgeAc.findById(
        savedFridgeAc._id
      ).populate({
        path: "user",
        populate: {
          path: "location",
        },
      });
      const item = new Item({
        item: FridgeAc_location_user,
        location: FridgeAc_location_user[0].location,
      });
      const savedInItems = await item.save();
      const saveInCategory = new Electronics({
        item: FridgeAc_location_user,
        location: FridgeAc_location_user[0].location,
      });
      const savedInCategory = await saveInCategory.save();
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            FridgeAc_location_user,
            "new FridgeAc created successfully"
          )
        );
    }
  } catch (error) {
    console.log(`error while creating new FridgeAc ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while creating new FridgeAc"));
  }
});
const getAllFridgeAc = AsyncHandler(async (req, res) => {
  try {
    const FridgeAcs = await FridgeAc.find().populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(new ApiResponse(200, FridgeAcs, "these are all the FridgeAcs"));
  } catch (error) {
    console.log("error while fetching all FridgeAcs ", error);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fething all FridgeAcs"));
  }
});
const getSingleFridgeAc = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the FridgeAc")
        );
    }
    const FridgeAc = await FridgeAc.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!FridgeAc) {
      return res
        .status(404)
        .json(new ApiResponse(404, FridgeAc, "the FridgeAc does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, FridgeAc, "FridgeAc fetched successfully"));
  } catch (error) {
    console.log("error while fetching single FridgeAc ", error);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fething single FridgeAc"));
  }
});
const updateFridgeAc = AsyncHandler(async (req, res) => {
  const { _id, brand, model, capacity, media, location, askingPrice } =
    req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "_id the of the document is required"));
    }
    const updatedFridgeAc = await FridgeAc.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedFridgeAc) {
      return res
        .status(404)
        .json(new ApiResponse(404, updateFridgeAc, "FridgeAc not found"));
    } else if (updatedFridgeAc) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedFridgeAc,
            "your listing for this FridgeAc updated"
          )
        );
    }
  } catch (error) {
    console.log("error while updating the FridgeAc  ", error);
    return res
      .status(500)
      .json(new ApiResponse(500, "", "erorr while updating the FridgeAc"));
  }
});
const deleteFridgeAc = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedFridgeAc = await FridgeAc.findByIdAndDelete(_id);
    if (!deletedFridgeAc) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "FridgeAc does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "FridgeAc deleted successfully"));
  } catch (error) {
    console.log("error while deleting the FridgeAc ", error);
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while deleting FridgeAc"
        )
      );
  }
});

export {
  createFridgeAc,
  getAllFridgeAc,
  getSingleFridgeAc,
  updateFridgeAc,
  deleteFridgeAc,
};
