import { AsyncHandler, ApiResponse } from "../../../utils/index.js";
import { Tv } from "../../../models/listing/electronics/index.js";

const createTv = AsyncHandler(async (req, res) => {
  const {
    user,
    brand,
    brandModel,
    screenSize,
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
    } else if (!brand) {
      return res
        .status(400)
        .json(new ApiResponse(400, brand, " brand of the tv is required"));
    } else if (!brandModel) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, brandModel, "brand model of tv is required")
        );
    } else if (!screenSize) {
      return res
        .status(400)
        .json(new ApiResponse(400, age, "screen size is required"));
    } else if (media.length === 0) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, media, "atleast one image or video is required")
        );
    } else if (!location) {
      return res
        .status(400)
        .json(new ApiResponse(400, location, "location of the tv is required"));
    } else if (!askingPrice) {
      return res
        .status(400)
        .json(new ApiResponse(400, askingPrice, "asking price is required"));
    } else {
      const newTv = new Tv(req.body);
      const savedTv = await newTv.save();
      const tv_location_user = await Tv.findById(savedTv._id).populate({
        path: "user",
        populate: {
          path: "location",
        },
      });
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, tv_location_user, "new tv created successfully")
      );
  } catch (error) {
    console.log(`error while creating new wahing machine ${error}`);
    return res
      .status(200)
      .json(new ApiResponse(200, error, "error while creating new Tv"));
  }
});
const getAllTv = AsyncHandler(async (req, res) => {
  try {
    const tv = await Tv.find().populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(new ApiResponse(200, tv, "these are all the tvs"));
  } catch (error) {
    console.log("error while fetching single tvs", error);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fething all tvs"));
  }
});
const getSingleTv = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "please provide the id of the tv"));
    }
    const tv = await Tv.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!tv) {
      return res
        .status(404)
        .json(new ApiResponse(404, tv, "the tv does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, tv, "tv fetched successfully"));
  } catch (error) {
    console.log("error while fetching single tv", error);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fething single tv"));
  }
});
const updateTv = AsyncHandler(async (req, res) => {
  const {
    _id,
    brand,
    brandModel,
    screenSize,
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
    const updatedTv = await Tv.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedTv) {
      return res
        .status(404)
        .json(new ApiResponse(404, updatedTv, "tv not found"));
    } else if (updatedTv) {
      return res
        .status(200)
        .json(
          new ApiResponse(200, updatedTv, "your listing for this tv updated")
        );
    }
  } catch (error) {
    console.log("error while updating the tv", error);
    return res
      .status(500)
      .json(new ApiResponse(500, "", "erorr while updating the tv"));
  }
});
const deleteTv = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedTv = await Tv.findByIdAndDelete(_id);
    if (!deletedTv) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "tv does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "tv deleted successfully"));
  } catch (error) {
    console.log("error while deleting the tv", error);
    res
      .status(500)
      .json(
        new ApiResponse(500, error, "internal server error while deleting tv")
      );
  }
});
export { createTv, getAllTv, getSingleTv, updateTv, deleteTv };
