import { ApiError, AsyncHandler, ApiResponse } from "../../../utils/index.js";
import { CowBuffalo } from "../../../models/listing/animal/index.js";
import Item from "../../../models/listing/items/items.models.js";

const createCowBuffalo = async (req, res) => {
  const {
    user,
    type,
    breed,
    lactation,
    currentCapacity,
    maximumCapacity,
    hasDeliverdBaby,
    whenDelivered,
    hasCalf,
    isPregnant,
    monthsPregnant,
    additionalInformation,
    media,
    askingPrice,
    location,
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
    } else if (!breed) {
      return res
        .status(400)
        .json(new ApiResponse(400, breed, "breed of the animal is required"));
    } else if (!lactation) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            lactation,
            "lactation cycle of the animal is required"
          )
        );
    } else if (!maximumCapacity) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            maximumCapacity,
            "maximum capacity the animal is required"
          )
        );
    } else if (media.length == 0) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, media, "atleast one image or video is required")
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
        .json(new ApiResponse(400, askingPrice, "asking price is required"));
    } else {
      const newCowBuffalo = new CowBuffalo(req.body);
      const savedCowBuffalo = await newCowBuffalo.save();
      const animal_location_user = await CowBuffalo.find(
        savedCowBuffalo._id
      ).populate({ path: "user", populate: { path: "location" } });
      const item = new Item({
        item: animal_location_user,
        location: animal_location_user[0].location,
      });
      const savedInItems = await item.save();
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            animal_location_user,
            "farm animal listing created successfully"
          )
        );
    }
  } catch (error) {
    console.log(error, "internal server while creating cow/buffalo");
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          location,
          "Internal server error while creating new cow / buffalo"
        )
      );
  }
};

const getAllCowBuffalo = async (req, res) => {
  const { type } = req.body;
  try {
    let query = {};
    if (!type) {
      return res
        .status(400)
        .json(new ApiResponse(400, type, "type of the animal is required"));
    }
    if (type == "cow" || type == "buffalo") {
      query.type = type.toLowerCase();
      const cowOrBuffaloes = await CowBuffalo.find(query).populate({
        path: "user",
        populate: { path: "location" },
      });
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            cowOrBuffaloes,
            `these are all the available ${query.type}`
          )
        );
    } else if (type == "all") {
      const cows_buffaloes = await CowBuffalo.find().populate({
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
            cows_buffaloes,
            "All cows and buffaloes fetched successfully"
          )
        );
    }
  } catch (error) {
    console.log(
      error,
      "this is the error while fetching all the cows and buffaloes"
    );
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          "",
          "Internal server error while fetching all the cow and buffalo"
        )
      );
  }
};

const getSingleCowBuffalo = async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const cowBuffalo = await CowBuffalo.findOne({ _id: _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!cowBuffalo) {
      return res
        .status(404)
        .json(new ApiResponse(404, cowBuffalo, "cow / buffalo not found"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, cowBuffalo, "cow/buffalo fetched successfully")
      );
  } catch (error) {
    console.log(`error while fetching single cow/buffalo ${error}`);
    return res
      .status(500)
      .json(
        new ApiResponse(500, "", "error while fething single cow or buffalo")
      );
  }
};

const updateCowBuffalo = async (req, res) => {
  const {
    _id,
    breed,
    lactation,
    currentCapacity,
    maximumCapacity,
    hasDeliverdBaby,
    whenDelivered,
    hasCalf,
    isPregnant,
    monthsPregnant,
    addtionalInformation,
    media,
    askingPrice,
    location,
  } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "is the of the document is required"));
    }
    const updatedCowBuffalo = await CowBuffalo.findByIdAndUpdate(
      _id,
      req.body,
      {
        new: true,
      }
    );
    const updateItem = await Item.findByIdAndUpdate(
      _id,
      { item: req.body },
      {
        new: true,
      }
    );
    if (!updateCowBuffalo) {
      return res
        .status(404)
        .json(new ApiResponse(404, updatedCowBuffalo, "cow/buffalo not found"));
    } else if (updatedCowBuffalo) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedCowBuffalo,
            "your listing for this cow/buffalo updated"
          )
        );
    }
  } catch (error) {
    console.log(`error while update cow/buffalo ${error}`);
    res
      .status(500)
      .json(new ApiResponse(500, error, "error while updating cow/buffalo"));
  }
};

const deleteCowBuffalo = async (req, res) => {
  const { _id } = req.body;

  try {
    const deleteCowBuffalo = await CowBuffalo.findByIdAndDelete(_id);
    if (!deleteCowBuffalo) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "cow / buffalo not found"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "cow / buffalo deleted successfully"));
  } catch (error) {
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
};

export {
  createCowBuffalo,
  getAllCowBuffalo,
  updateCowBuffalo,
  getSingleCowBuffalo,
  deleteCowBuffalo,
};
