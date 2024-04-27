import { AsyncHandler, ApiResponse } from "../../../utils/index.js";
import { Fridge } from "../../../models/listing/electronics/index.js";
import Item from "../../../models/listing/items/items.models.js";
import { Electronics } from "../../../models/category/index.js";

const createFridge = AsyncHandler(async (req, res) => {
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
        .json(new ApiResponse(400, brand, " brand of the fridge is required"));
    } else if (!model) {
      return res
        .status(400)
        .json(new ApiResponse(400, model, "model of the fridge is required"));
    } else if (!capacity) {
      return res
        .status(400)
        .json(new ApiResponse(400, age, "capcaity of the fridge is required"));
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
          new ApiResponse(400, location, "location of the fridge is required")
        );
    } else if (!askingPrice) {
      return res
        .status(400)
        .json(new ApiResponse(400, askingPrice, "asking price is required"));
    } else {
      const newFridge = new Fridge(req.body);
      const savedFridge = await newFridge.save();
      const fridge_location_user = await Fridge.findById(
        savedFridge._id
      ).populate({
        path: "user",
        populate: {
          path: "location",
        },
      });
      const item = new Item({
        item: fridge_location_user,
        location: fridge_location_user[0].location,
      });
      const savedInItems = await item.save();
      const saveInCategory = new Electronics({
        item: fridge_location_user,
        location: fridge_location_user[0].location,
      });
      const savedInCategory = await saveInCategory.save();
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            fridge_location_user,
            "new fridge created successfully"
          )
        );
    }
  } catch (error) {
    console.log(`error while creating new fridge ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while creating new fridge"));
  }
});
const getAllFridge = AsyncHandler(async (req, res) => {
  try {
    const fridges = await Fridge.find().populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(new ApiResponse(200, fridges, "these are all the fridges"));
  } catch (error) {
    console.log("error while fetching all fridges ", error);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fething all fridges"));
  }
});
const getSingleFridge = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "please provide the id of the fridge"));
    }
    const fridge = await Fridge.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!fridge) {
      return res
        .status(404)
        .json(new ApiResponse(404, fridge, "the fridge does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, fridge, "fridge fetched successfully"));
  } catch (error) {
    console.log("error while fetching single fridge ", error);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fething single fridge"));
  }
});
const updateFridge = AsyncHandler(async (req, res) => {
  const { _id, brand, model, capacity, media, location, askingPrice } =
    req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "_id the of the document is required"));
    }
    const updatedFridge = await Fridge.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedFridge) {
      return res
        .status(404)
        .json(new ApiResponse(404, updateFridge, "fridge not found"));
    } else if (updatedFridge) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedFridge,
            "your listing for this fridge updated"
          )
        );
    }
  } catch (error) {
    console.log("error while updating the fridge  ", error);
    return res
      .status(500)
      .json(new ApiResponse(500, "", "erorr while updating the fridge"));
  }
});
const deleteFridge = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedFridge = await Fridge.findByIdAndDelete(_id);
    if (!deletedFridge) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "Fridge does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "fridge deleted successfully"));
  } catch (error) {
    console.log("error while deleting the fridge ", error);
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while deleting fridge"
        )
      );
  }
});

export {
  createFridge,
  getAllFridge,
  getSingleFridge,
  updateFridge,
  deleteFridge,
};
