import { ApiError, AsyncHandler, ApiResponse } from "../../../utils/index.js";
import { Dog } from "../../../models/listing/animal/index.js";
const createDog = AsyncHandler(async (req, res) => {
  const {
    user,
    breed,
    gender,
    age,
    vaccination,
    additionalInformation,
    media,
    location,
    askingPrice,
  } = req.body;

  if (!user) {
    return res
      .status(400)
      .json(new ApiResponse(400, user, "user id is required"));
  } else if (!breed) {
    return res
      .status(400)
      .json(new ApiResponse(400, breed, "breed of the dog is required"));
  } else if (!gender) {
    return res
      .status(400)
      .json(new ApiResponse(400, gender, "gender of the dog is required"));
  } else if (!age) {
    return res
      .status(400)
      .json(new ApiResponse(400, gender, "age of the dog is required"));
  } else if (!vaccination) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          gender,
          "vaccination detail of the dog is required"
        )
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
      .json(new ApiResponse(400, location, "location of the dog is required"));
  } else if (!askingPrice) {
    return res
      .status(400)
      .json(new ApiResponse(400, askingPrice, "asking price is required"));
  } else {
    const newDog = new Dog(req.body);
    const savedDog = await newDog.save();
    const dog_location_user = await Dog.find(savedDog._id).populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(
        new ApiResponse(200, dog_location_user, "new dog created successfully")
      );
  }
});
const getAllDog = AsyncHandler(async (req, res) => {
  try {
    const dogs = await Dog.find().populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(new ApiResponse(200, dogs, "these are all the dogs"));
  } catch (error) {
    console.log("error while fetching all the dogs ", error);
    return res
      .status(500)
      .json(new ApiResponse(500, "", "error while fetching all the dogs"));
  }
});
const getSingleDog = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "please provide the id of the dog"));
    }
    const dog = await Dog.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!dog) {
      return res
        .status(404)
        .json(new ApiResponse(404, dog, "the dog does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, dog, "dog fetched successfully"));
  } catch (error) {
    console.log("error while fetching single dog ", error);
    return res
      .status(500)
      .json(new ApiResponse(500, "", "error while fething single dog"));
  }
});
const updateDog = AsyncHandler(async (req, res) => {
  const {
    _id,
    breed,
    gender,
    age,
    vaccination,
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
    const updatedDog = await Dog.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedDog) {
      return res
        .status(404)
        .json(new ApiResponse(404, updatedDog, "dog not found"));
    } else if (updatedDog) {
      return res
        .status(200)
        .json(
          new ApiResponse(200, updatedDog, "your listing for this dog updated")
        );
    }
  } catch (error) {
    console.log("error while updating the dog  ", error);
    return res
      .status(500)
      .json(new ApiResponse(500, "", "erorr while updating the dog"));
  }
});
const deleteDog = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedDog = await Dog.findByIdAndDelete(_id);
    if (!deletedDog) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "dog does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "dog deleted successfully"));
  } catch (error) {
    console.log("error while deleting the dog ", error);
    res
      .status(500)
      .json(
        new ApiResponse(500, "", "internal server error while deleting dog")
      );
  }
});

export { createDog, getAllDog, getSingleDog, updateDog, deleteDog };
