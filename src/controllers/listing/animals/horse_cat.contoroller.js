import Horse_Cat from "../../../models/listing/animal/horse_cat.model.js";
import { AsyncHandler, ApiResponse } from "../../../utils/index.js";

const createHorseCat = AsyncHandler(async (req, res) => {
  const {
    user,
    type,
    gener,
    breed,
    age,
    lactation,
    deliveredBaby,
    hasKid,
    isPregnant,
    additionalInformation,
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
      const newHorseCat = new Horse_Cat(req.body);
      const savedHorseCat = await newHorseCat.save();
      const animal_location_user = await Horse_Cat.find(
        savedHorseCat._id
      ).populate({ path: "user", populate: { path: "location" } });

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            animal_location_user,
            "horse /cat animal listing created successfully"
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
          "Internal server error while creating new horse / cat"
        )
      );
  }
});
const getAllHorseCat = AsyncHandler(async (req, res) => {
  const { type } = req.body;
  try {
    let query = {};
    if (!type) {
      return res
        .status(400)
        .json(new ApiResponse(400, type, "type of the animal is required"));
    }
    if (type == "horse" || type == "cat") {
      query.type = type.toLowerCase();
      const horseOrCat = await Horse_Cat.find(query).populate({
        path: "user",
        populate: { path: "location" },
      });
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            horseOrCat,
            `these are all the available ${query.type}`
          )
        );
    } else if (type == "all") {
      const horses_cats = await Horse_Cat.find().populate({
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
            horses_cats,
            "All horse and cat fetched successfully"
          )
        );
    }
  } catch (error) {
    console.log(
      error,
      "this is the error while fetching all the horse and cat"
    );
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          "",
          "Internal server error while fetching all the horses and cats"
        )
      );
  }
});

const getSingleHorseCat = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const horseCat = await Horse_Cat.findOne({ _id: id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!horseCat) {
      return res
        .status(404)
        .json(new ApiResponse(404, horseCat, "horse/cat not found"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, horseCat, "horse/cat fetched successfully"));
  } catch (error) {
    console.log(`error while fetching single horse/cat ${error}`);
    return res
      .status(500)
      .json(
        new ApiResponse(500, "", "error while fething single horse or cat")
      );
  }
});

const updateHorseCat = AsyncHandler(async (req, res) => {
  const {
    _id,
    type,
    gener,
    breed,
    age,
    lactation,
    deliveredBaby,
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
    const updatedHorseCat = await Horse_Cat.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedHorseCat) {
      return res
        .status(404)
        .json(new ApiResponse(404, updatedHorseCat, "horse/cat not found"));
    } else if (updatedHorseCat) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedHorseCat,
            "your listing for this horse/cat updated"
          )
        );
    }
  } catch (error) {
    console.log("error while updating the horse cat ", error);
    res
      .status(500)
      .json(new ApiResponse(500, error, "error while updating horse/cat"));
  }
});
const deleteHorseCat = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedHorseCat = await Horse_Cat.findByIdAndDelete(_id);
    if (!deleteHorseCat) {
      return res
        .status(404)
        .json(new ApiResponse(404, _id, "horse / cat not found"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "horse / cat deleted successfully"));
  } catch (error) {
    console.log(`error while deleting the goat sheep ${error}`);
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          "",
          "internal server error while deleting horse / cat"
        )
      );
  }
});

export {
  createHorseCat,
  getAllHorseCat,
  getSingleHorseCat,
  updateHorseCat,
  deleteHorseCat,
};
