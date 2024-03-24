import { ApiResponse, ApiError, AsyncHandler } from "../../../utils/index.js";
import { Bull } from "../../../models/listing/animal/index.js";

const createBull = async (req, res) => {
  const {
    user,
    breed,
    age,
    addtionalInformation,
    media,
    location,
    askingPrice,
  } = req.body;

  console.log(media, "this is media");

  try {
    if (!user) {
      return res.status(400, user, "id of the user is required");
    } else if (!breed) {
      return res
        .status(400)
        .json(new ApiResponse(400, breed, "breed of the bull is required"));
    } else if (!age) {
      return res
        .status(400)
        .json(new ApiResponse(400, age, "age of the bull is required"));
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
          new ApiResponse(400, location, "location of the bull is required")
        );
    } else if (!askingPrice) {
      return res
        .status(400)
        .json(new ApiResponse(400, askingPrice, "asking price is required"));
    } else {
      const newBull = new Bull(req.body);
      const savedBull = await newBull.save();
      const bull_location_user = await Bull.find(savedBull._id).populate({
        path: "user",
        populate: { path: "location" },
      });
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            bull_location_user,
            "new bull created successfully"
          )
        );
    }
  } catch (error) {
    console.log("error while creating new bull", error);
  }
};

const getAllBulls = async (req, res) => {
  try {
    const bulls = await Bull.find().populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(new ApiResponse(200, bulls, "these are all the bulls"));
  } catch (error) {
    console.log("error while fetching all the bulls ", error);
    return res
      .status(500)
      .json(new ApiResponse(500, "", "error while fetching all the bulls"));
  }
};

const getSingleBull = async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "please provide the id of the bull"));
    }
    const bull = await Bull.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!bull) {
      return res
        .status(404)
        .json(new ApiResponse(404, bull, "the bull does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, bull, "bull fetched successfully"));
  } catch (error) {
    console.log(`error while fetching single bull ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, "", "error while fething single bull"));
  }
};

const updateBull = async (req, res) => {
  const {
    _id,
    breed,
    age,
    addtionalInformation,
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
    const updatedBull = await Bull.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedBull) {
      return res
        .status(404)
        .json(new ApiResponse(404, updatedBull, "bull not found"));
    } else if (updatedBull) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedBull,
            "your listing for this bull updated"
          )
        );
    }
  } catch (error) {
    console.log("error while updating the bull  ", error);
    return res
      .status(500)
      .json(new ApiResponse(500, "", "erorr while updating the bull"));
  }
};

const deleteBull = async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res.send(400).json(new ApiResponse(400, _id, "please provide the id of the document"))
    }
    const deletedBull = await Bull.findByIdAndDelete(_id);
    if (!deletedBull) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "bull does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "bull deleted successfully"));
  } catch (error) {
    console.log("error while deleting the bull ", error)
    res
      .status(500)
      .json(
        new ApiResponse(500, "", "internal server error while deleting bull")
      );
  }
};

export { createBull, getAllBulls, getSingleBull, updateBull, deleteBull };
