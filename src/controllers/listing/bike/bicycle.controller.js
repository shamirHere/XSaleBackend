import { AsyncHandler, ApiResponse } from "../../../utils/index.js";
import { Bicycle } from "../../../models/listing/bike/index.js";
import Item from "../../../models/listing/items/items.models.js";
import { Bikes } from "../../../models/category/index.js";

const createBicycle = AsyncHandler(async (req, res) => {
  const {
    user,
    categoryName,
    productType,
    brand,
    model,
    isElectric,
    oldInMonths,
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
    } else if (!categoryName) {
      return res
        .status(400)
        .json(new ApiResponse(400, categoryName, "category name is required"));
    } else if (!productType) {
      return res
        .status(400)
        .json(new ApiResponse(400, productType, "product type is required"));
    } else if (!brand) {
      return res
        .status(400)
        .json(new ApiResponse(400, brand, "brand of the bicycle is required"));
    } else if (!model) {
      return res
        .status(400)
        .json(new ApiResponse(400, model, "model of the bicycle is required"));
    } else if (!isElectric) {
      return res
        .status(400)
        .json(new ApiResponse(400, isElectric, "send yes or no on isElectric"));
    } else if (!oldInMonths) {
      return res
        .status(400)
        .json(new ApiResponse(400, oldInMonths, "provide how much month old"));
    } else if (!media) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, media, "atleast one image or video is required")
        );
    } else if (!location) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, location, "location of the bicycle is required")
        );
    } else if (!askingPrice) {
      return res
        .status(400)
        .json(new ApiResponse(400, askingPrice, "asking price is required"));
    } else {
      const newBicycle = new Bicycle(req.body);
      const savedBicycle = await newBicycle.save();
      const bicycle_location_user = await Bicycle.find(
        savedBicycle._id
      ).populate({
        path: "user",
      });
      const item = new Item({
        item: bicycle_location_user,
        location: bicycle_location_user[0].location,
      });
      const savedInItems = await item.save();
      const saveInCategory = new Bikes({
        item: bicycle_location_user,
        location: bicycle_location_user[0].location,
      });
      const savedInCategory = await saveInCategory.save();
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            bicycle_location_user,
            "new bicycle created successfully"
          )
        );
    }
  } catch (error) {
    console.log(`error while creating new bicycle document ${error}`);
    return res
      .status(500)
      .json(
        new ApiResponse(500, error, "internal error while creating new bicycle")
      );
  }
});

const getAllBicycle = AsyncHandler(async (req, res) => {
  try {
    const bicycles = await Bicycle.find().populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(new ApiResponse(200, bicycles, "these are all the bicyles"));
  } catch (error) {
    console.log("error while fetching all the bicycle ", error);
    return res
      .status(500)
      .json(
        new ApiResponse(500, error, "error while fetching all the bicycle")
      );
  }
});

const getSingleBicycle = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "provide the id of the bicycle"));
    }
    const bicycle = await Bicycle.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!bicycle) {
      return res
        .status(404)
        .json(new ApiResponse(404, bicycle, "the bicycle does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, bicyle, "bicycle fetched successfully"));
  } catch (error) {
    console.log("error while fetching single bicyle ", error);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fething single bicycle"));
  }
});

const updateBicycle = AsyncHandler(async (req, res) => {
  const {
    _id,
    brand,
    model,
    isElectric,
    oldInMonths,
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
    const updatedBicycle = await Bicycle.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedBicycle) {
      return res
        .status(404)
        .json(new ApiResponse(404, updatedBicycle, "bicycle not found"));
    } else if (updatedBicycle) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedBicycle,
            "your listing for this bicycle updated"
          )
        );
    }
  } catch (error) {
    console.log("error while updating the bicycle  ", error);
    return res
      .status(500)
      .json(new ApiResponse(500, "", "erorr while updating the bicyle"));
  }
});
const deleteBicycle = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(new ApiResponse(400, _id, "provide the id of the document"));
    }
    const deletedBicycle = await Bicycle.findByIdAndDelete(_id);
    if (!deletedBicycle) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "bicycle does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "bicyle deleted successfully"));
  } catch (error) {
    console.log("error while deleting the bicycle ", error);
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while deleting bicycle"
        )
      );
  }
});
export {
  createBicycle,
  getAllBicycle,
  getSingleBicycle,
  updateBicycle,
  deleteBicycle,
};
