import { AsyncHandler, ApiResponse } from "../../../utils/index.js";
import Furniture from "../../../models/listing/furniture/index.js";

const createFurniture = AsyncHandler(async (req, res) => {
  const {
    user,
    furnitureName,
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
    } else if (!furnitureName) {
      return res
        .status(400)
        .json(new ApiResponse(400, brand, "name of the furniture is required"));
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
            "location of the furniture is required"
          )
        );
    } else if (!askingPrice) {
      return res
        .status(400)
        .json(new ApiResponse(400, askingPrice, "asking price is required"));
    } else {
      const newFurniture = new Furniture(req.body);
      const savedFurniture = await newFurniture.save();
      const furniture_location_user = await Furniture.findById(
        savedFurniture._id
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
            furniture_location_user,
            "new furniture machine created successfully"
          )
        );
    }
  } catch (error) {
    console.log(`error while creating new furniture ${error}`);
    return res
      .status(200)
      .json(new ApiResponse(200, error, "error while creating new furniture"));
  }
});

const getAllFurniture = AsyncHandler(async (req, res) => {
  try {
    const furnitures = await Furniture.find().populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(new ApiResponse(200, furnitures, "these are all the furnitures"));
  } catch (error) {
    console.log("error while fetching all furnitures", error);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fething all furnitures"));
  }
});
const getSingleFurniture = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the furniture")
        );
    }
    const furniture = await Furniture.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!furniture) {
      return res
        .status(404)
        .json(new ApiResponse(404, furniture, "the furniture does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, furniture, "furniture fetched successfully"));
  } catch (error) {
    console.log("error while fetching single furniture", error);
    return res
      .status(500)
      .json(
        new ApiResponse(500, error, "error while fething single furniture")
      );
  }
});
const updateFurniture = AsyncHandler(async (req, res) => {
  const {
    _id,
    furnitureName,
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
    const updatedFurniture = await Furniture.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedFurniture) {
      return res
        .status(404)
        .json(new ApiResponse(404, updatedFurniture, "furniture not found"));
    } else if (updatedFurniture) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedFurniture,
            "your listing for this furniture updated"
          )
        );
    }
  } catch (error) {
    console.log("error while updating the furniture", error);
    return res
      .status(500)
      .json(new ApiResponse(500, "", "erorr while updating the furniture"));
  }
});
const deleteFurniture = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedFurniture = await Furniture.findByIdAndDelete(_id);
    if (!deletedFurniture) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "furniture not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "furniture deleted successfully"));
  } catch (error) {
    onsole.log("error while deleting the furniture", error);
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while deleting furniture"
        )
      );
  }
});

export {
  createFurniture,
  getAllFurniture,
  getSingleFurniture,
  updateFurniture,
  deleteFurniture,
};
