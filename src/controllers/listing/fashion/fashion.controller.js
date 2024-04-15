import { AsyncHandler, ApiResponse } from "../../../utils/index.js";
import Fashion from "../../../models/listing/fashion/index.js";

const createFashion = AsyncHandler(async (req, res) => {
  const { user, adTitle, desribeSelling, media, location, askingPrice } =
    req.body;
  try {
    if (!user) {
      return res
        .status(400)
        .json(new ApiResponse(400, user, "user id is required"));
    } else if (!adTitle) {
      return res
        .status(400)
        .json(new ApiResponse(400, adTitle, "adTitle is required"));
    } else if (!desribeSelling) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, desribeSelling, "describe selling is required")
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
          new ApiResponse(400, location, "location of the fashion is required")
        );
    } else if (!askingPrice) {
      return res
        .status(400)
        .json(new ApiResponse(400, askingPrice, "asking price is required"));
    } else {
      const newFashion = new Fashion(req.body);
      const savedFashion = await newFashion.save();
      const fashion_location_user = await Fashion.find(
        savedFashion._id
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
            fashion_location_user,
            "new fashion created successfully"
          )
        );
    }
  } catch (error) {
    console.log(`error while creating new fashion ${error}`);
    return res
      .status(200)
      .json(new ApiResponse(200, error, "error while creating new fashion"));
  }
});
const getAllFashion = AsyncHandler(async (req, res) => {
  try {
    const fashions = await Fashion.find().populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(new ApiResponse(200, fashions, "these are all the fashions"));
  } catch (error) {
    console.log("error while fetching all the fashions", error);
    return res
      .status(500)
      .json(
        new ApiResponse(500, error, "error while fetching all the fashions")
      );
  }
});
const getSingleFashion = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the fashion")
        );
    }
    const fashion = await Fashion.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!fashion) {
      return res
        .status(404)
        .json(new ApiResponse(404, fashion, "the fashion does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, fashion, "fashion fetched successfully"));
  } catch (error) {
    console.log("error while fetching single fashion", error);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fething single fashion"));
  }
});
const updateFashion = AsyncHandler(async (req, res) => {
  const { _id, adTitle, desribeSelling, media, location, askingPrice } =
    req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "_id the of the document is required"));
    }
    const updatedFashion = await Fashion.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedFashion) {
      return res
        .status(404)
        .json(new ApiResponse(404, updatedFashion, "fashion not found"));
    } else if (updatedFashion) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedFashion,
            "your listing for this fashion updated"
          )
        );
    }
  } catch (error) {
    console.log("error while updating the fashion", error);
    return res
      .status(500)
      .json(new ApiResponse(500, "", "erorr while updating the fashion"));
  }
});
const deleteFashion = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedFashion = await Fashion.findByIdAndDelete(_id);
    if (!deletedFashion) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "Fashion does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "fashion deleted successfully"));
  } catch (error) {
    console.log("error while deleting the fashion", error);
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while deleting fashion"
        )
      );
  }
});
export {
  createFashion,
  getAllFashion,
  getSingleFashion,
  updateFashion,
  deleteFashion,
};
