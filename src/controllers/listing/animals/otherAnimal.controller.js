import { OtherAnimal } from "../../../models/listing/animal/index.js";
import {
  ApiResponse,
  AsyncHandler,
  ApiResponse,
} from "../../../utils/index.js";

const createOtherAnimal = AsyncHandler(async (req, res) => {
  const {
    user,
    name,
    age,
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
    } else if (!name) {
      return res
        .status(400)
        .json(new ApiResponse(400, name, "name of the animal is required"));
    } else if (!age) {
      return res
        .status(400)
        .json(new ApiResponse(400, age, "age of the animal is required"));
    } else if (media.length === 0) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            media,
            "atleast one image or video  of the animal is required"
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
        .json(
          new ApiResponse(
            400,
            askingPrice,
            "askingPrice of the animal is required"
          )
        );
    } else {
      const newOtherAnimal = new OtherAnimal(req.body);
      const savedOtherAnimal = await newOtherAnimal.save();
      const otherAnimal_location_user = await OtherAnimal.find(
        savedOtherAnimal._id
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
            otherAnimal_location_user,
            "new other animal created successfully"
          )
        );
    }
  } catch (error) {
    console.log(`error while creating new other animal ${error}`);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while creating new other animal"
        )
      );
  }
});

const getAllOtherAnimals = AsyncHandler(async (req, res) => {
  try {
    const otherAnimals = await OtherAnimal.find().populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(
        new ApiResponse(200, otherAnimals, "these are all the other animals")
      );
  } catch (error) {
    console.log("error while fetching all the other animals ", error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "error while fetching all the other animals"
        )
      );
  }
});
const getSingleOtherAnimal = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "please provide the id of the donkey"));
    }
    const otherAnimal = await OtherAnimal.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!otherAnimal) {
      return res
        .status(404)
        .json(new ApiResponse(404, donkey, "other animal does not exist"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, otherAnimal, "other animal fetched successfully")
      );
  } catch (error) {
    console.log("error while fetching single other animal ", error);
    return res
      .status(500)
      .json(
        new ApiResponse(500, error, "error while fething single other animal")
      );
  }
});
const updateOtherAnimal = AsyncHandler(async (req, res) => {
  const {
    _id,
    name,
    age,
    additionalInformation,
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
    const updatedOtherAnimal = await OtherAnimal.findByIdAndUpdate(
      _id,
      req.body,
      {
        new: true,
      }
    );
    if (!updateOtherAnimal) {
      return res
        .status(404)
        .json(
          new ApiResponse(404, updatedOtherAnimal, "other animal not found")
        );
    } else if (updateOtherAnimal) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updateOtherAnimal,
            "your listing for this other animal updated"
          )
        );
    }
  } catch (error) {
    console.log("error while updating the other animal", error);
    return res
      .status(500)
      .json(new ApiResponse(500, "", "erorr while updating the other animal "));
  }
});
const deleteOtherAnimal = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedOtherAnimal = await OtherAnimal.findByIdAndDelete(_id);
    if (!deletedOtherAnimal) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "donkey does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "other animal deleted successfully"));
  } catch (error) {
    console.log("error while deleting the other animal ", error);
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while deleting the other animal"
        )
      );
  }
});
export {
  createOtherAnimal,
  getAllOtherAnimals,
  getSingleOtherAnimal,
  updateOtherAnimal,
  deleteOtherAnimal,
};
