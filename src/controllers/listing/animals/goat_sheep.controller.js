import { Goat_Sheep } from "../../../models/listing/animal/goat_sheep.model.js";
import { AsyncHandler, ApiResponse } from "../../../utils/index.js";

const createGoatSheep = AsyncHandler(async (req, res) => {
  const {
    user,
    type,
    gender,
    breed,
    age,
    lactation,
    currentCapacity,
    maximumCapacity,
    hasDeliverdBaby,
    hasKid,
    isPregnant,
    media,
    location,
    askingPrice,
  } = req.body;
  try {
    if (!user) {
      return res
        .status(400)
        .json(new ApiResponse(400, user, "id of the user is required"));
    } else if (!type) {
      return res
        .status(400)
        .json(new ApiResponse(400, type, "type is required"));
    } else if (!gender) {
      return res
        .status(400)
        .json(new ApiResponse(400, breed, "gender of the animal is required"));
    } else if (!age) {
      return res
        .status(400)
        .json(new ApiResponse(400, age, "age of the animal is required"));
    } else if (media.length == 0) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            media,
            "at least one image or video of the animal is required"
          )
        );
    } else if (!location) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, location, "location of the animal is required")
        );
    } else if (!askingPrice) {
      return res
        .status(400)
        .json(new ApiResponse(400, askingPrice, "askingPrice is required"));
    } else {
      const newGoatSheep = new Goat_Sheep(req.body);
      const savedGoatSheep = await newGoatSheep.save();
      const animal_location_user = await Goat_Sheep.find(
        savedGoatSheep._id
      ).populate({ path: "user", populate: { path: "location" } });
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            animal_location_user,
            "goat/sheep animal listing created successfully"
          )
        );
    }
  } catch (error) {
    console.log(error, "this is the error");
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "Internal server error while creating new goat / sheep"
        )
      );
  }
});

const getAllGoatSheep = AsyncHandler(async (req, res) => {
  const { type } = req.body;
  try {
    let query = {};
    if (!type) {
      return res
        .status(400)
        .json(new ApiResponse(400, type, "type of the animal is required"));
    }
    if (type == "goat" || type == "sheep") {
      query.type = type.toLowerCase();
      const goatOrSheep = await Goat_Sheep.find(query).populate({
        path: "user",
        populate: { path: "location" },
      });
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            goatOrSheep,
            `these are all the available ${query.type}`
          )
        );
    } else if (type == "all") {
      const goats_sheeps = await Goat_Sheep.find().populate({
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
            goats_sheeps,
            "All cows and buffaloes fetched successfully"
          )
        );
    }
  } catch (error) {
    console.log(
      error,
      "this is the error while fetching all the goat and sheep"
    );
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          "",
          "Internal server error while fetching all the goat and sheep"
        )
      );
  }
});

const getSingleGoatSheep = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const goatSheep = await Goat_Sheep.findOne({ _id: id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!goatSheep) {
      return res
        .status(404)
        .json(new ApiResponse(404, goatSheep, "goat/sheep not found"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, goatSheep, "goat/sheep fetched successfully"));
  } catch (error) {
    console.log(`error while fetching single goat/sheep ${error}`);
    return res
      .status(500)
      .json(
        new ApiResponse(500, "", "error while fething single goat or sheep")
      );
  }
});
const updateGoatSheep = AsyncHandler(async (req, res) => {
  const {
    _id,
    type,
    gender,
    breed,
    age,
    lactation,
    currentCapacity,
    maximumCapacity,
    hasDeliverdBaby,
    hasKid,
    isPregnant,
    media,
    location,
    askingPrice,
  } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "is the of the document is required"));
    }
    const updatedGoatSheep = await Goat_Sheep.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedGoatSheep) {
      return res
        .status(404)
        .json(new ApiResponse(404, updatedGoatSheep, "goat/sheep not found"));
    } else if (updatedGoatSheep) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedGoatSheep,
            "your listing for this goat/sheep updated"
          )
        );
    }
  } catch (error) {
    console.log("error while updating the goat sheep ", error);
    res
      .status(500)
      .json(new ApiResponse(500, error, "error while updating goat/sheep"));
  }
});

const deleteGoatSheep = AsyncHandler(async (req, res) => {
  const { _id } = req.body;

  try {
    if (!_id) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedGoatSheep = await Goat_Sheep.findByIdAndDelete(_id);
    if (!deletedGoatSheep) {
      return res
        .status(404)
        .json(new ApiResponse(404, _id, "goat / sheep not found"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "goat / sheep deleted successfully"));
  } catch (error) {
    console.log(`error while deleting the goat sheep ${error}`);
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          "",
          "internal server error while deleting cow / buffalo"
        )
      );
  }
});

export {
  createGoatSheep,
  getAllGoatSheep,
  getSingleGoatSheep,
  updateGoatSheep,
  deleteGoatSheep,
};
