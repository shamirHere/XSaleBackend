import { ApiError, AsyncHandler } from "../../../utils/index.js";
import Item from "../../../models/listing/items/items.models.js";
import { Land } from "../../../models/listing/property/index.js";
import {
  Properties,
  PropertiesRent,
} from "../../../models/category/properties/index.js";

const createLand = AsyncHandler(async (req, res) => {
  const {
    user,
    sellingType,
    productType,
    type,
    totalArea,
    listedBy,
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
    } else if (!type) {
      return res
        .status(400)
        .json(new ApiResponse(400, type, "type of the land is required"));
    } else if (!totalArea) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, totalArea, "total are of the land is required")
        );
    } else if (!listedBy) {
      return res
        .status(400)
        .json(new ApiResponse(400, listedBy, "listed by is required"));
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
          new ApiResponse(400, location, "location of the land is required")
        );
    } else if (!askingPrice) {
      return res
        .status(400)
        .json(new ApiResponse(400, askingPrice, "asking price is required"));
    } else {
      const newLand = new Land(req.body);
      const savedLand = await newLand.save();
      const land_location_user = await Land.find(savedLand._id).populate({
        path: "user",
        populate: {
          path: "location",
        },
      });
      const item = new Item({
        item: land_location_user,
        location: land_location_user[0].location,
      });
      const savedInItems = await item.save();
      if (land_location_user[0].sellingType === "for sale") {
        const saveInCategory = new Properties({
          item: land_location_user,
          location: land_location_user[0].location,
        });
        const savedInCategory = await saveInCategory.save();
      } else if (land_location_user[0].sellingType === "for rent") {
        const saveInCategory = new PropertiesRent({
          item: land_location_user,
          location: land_location_user[0].location,
        });
        const savedInCategory = await saveInCategory.save();
      }
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            land_location_user,
            "new land created successfully"
          )
        );
    }
  } catch (error) {
    console.log(`error while creating land ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while creating new land"));
  }
});
const getAllLand = AsyncHandler(async (req, res) => {
  try {
    const lands = await Land.find().populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(new ApiResponse(200, lands, "these are all the lands"));
  } catch (error) {
    console.log(`error while fetching all land ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fetcing single land"));
  }
});
const getSingleLand = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "please provide the id of the land"));
    }
    const land = await Land.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!land) {
      return res
        .status(404)
        .json(new ApiResponse(404, land, "the land does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, land, "land fetched successfully"));
  } catch (error) {
    console.log(`error while fetching single land ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fetching single land"));
  }
});
const updateLand = AsyncHandler(async (req, res) => {
  const {
    _id,
    sellingType,
    productType,
    type,
    totalArea,
    listedBy,
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
    const updatedLand = await Land.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedLand) {
      return res
        .status(404)
        .json(new ApiResponse(404, updatedLand, "land not found"));
    } else if (updatedLand) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedLand,
            "your listing for this land updated"
          )
        );
    }
  } catch (error) {
    console.log(`error while updating land ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while updating new land"));
  }
});
const deleteLand = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedLand = await Land.findByIdAndDelete(_id);
    if (!deletedLand) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "land does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "land deleted successfully"));
  } catch (error) {
    console.log(`error while deleting land ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while deleting new land"));
  }
});

export { createLand, getAllLand, getSingleLand, updateLand, deleteLand };
