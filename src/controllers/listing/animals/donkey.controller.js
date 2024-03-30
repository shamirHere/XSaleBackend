import {
  AsyncHandler,
  ApiResponse,
  ApiResponse,
} from "../../../utils/index.js";
import { Donkey } from "../../../models/listing/animal/index.js";

const createDonkey = AsyncHandler(async (req, res) => {
  const {
    user,
    gender,
    age,
    lactation,
    hasDeliveredBaby,
    haFoal,
    isPregnant,
    media,
    location,
    askingPrice,
  } = req.body;

  if (!user) {
    return res
      .status(400)
      .json(new ApiResponse(400, user, "user id is required"));
  } else if (!gender) {
    return res
      .status(400)
      .json(new ApiResponse(400, gender, "gender of the donkey is required"));
  } else if (!age) {
    return res
      .status(400)
      .json(new ApiResponse(400, age, "age of the donkey is required"));
  } else if (media.lenth === 0) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          media,
          "atleast one image or video of the donkey is required"
        )
      );
  } else if (!location) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, location, "location of the donkey is required")
      );
  } else if (!askingPrice) {
    return res
      .status(400)
      .json(new ApiResponse(400, askingPrice, "asking price is required"));
  } else {
    try {
      const newDonkey = new Donkey(req.body);
      const savedDonkey = await newDonkey.save();
      const donkey_location_user = await Donkey.find(savedDonkey._id).populate({
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
            donkey_location_user,
            "new donkey created successfully"
          )
        );
    } catch (error) {
      console.log("error while creating new donkey ", error);
      return res
        .status(500)
        .json(
          new ApiResponse(
            500,
            "error while creating new donkey , internal server error"
          )
        );
    }
  }
});

const getAllDonkeys = AsyncHandler(async (req, res) => {
  try {
    const donkeys = await Donkey.find().populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(new ApiResponse(200, donkeys, "these are all the donkeys"));
  } catch (error) {
    console.log("error while fetching all the donkeys ", error);
    return res
      .status(500)
      .json(
        new ApiResponse(500, error, "error while fetching all the donkeys")
      );
  }
});
const getSingleDonkey = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "please provide the id of the donkey"));
    }
    const donkey = await Donkey.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!donkey) {
      return res
        .status(404)
        .json(new ApiResponse(404, donkey, "the donkey does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, donkey, "donkey fetched successfully"));
  } catch (error) {
    console.log("error while fetching single donkey ", error);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fething single donkey"));
  }
});
const updateDonkey = AsyncHandler(async (req, res) => {
  const {
    _id,
    gender,
    age,
    lactation,
    hasDeliveredBaby,
    haFoal,
    isPregnant,
    media,
    location,
    askingPrice,
  } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, _id, " _id the of the document is required")
        );
    }
    const updatedDonkey = await Donkey.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedDonkey) {
      return res
        .status(404)
        .json(new ApiResponse(404, updatedDonkey, "donkey not found"));
    } else if (updatedDonkey) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedDonkey,
            "your listing for this donkey updated"
          )
        );
    }
  } catch (error) {
    console.log("error while updating the donkey", error);
    return res
      .status(500)
      .json(new ApiResponse(500, "", "erorr while updating the donkey"));
  }
});
const deleteDonkey = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedDonkey = await Donkey.findByIdAndDelete(_id);
    if (!deletedDonkey) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "donkey does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "donkey deleted successfully"));
  } catch (error) {
    console.log("error while deleting the donkey ", error);
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while deleting donkey"
        )
      );
  }
});

export {
  createDonkey,
  getAllDonkeys,
  getSingleDonkey,
  updateDonkey,
  deleteDonkey,
};
