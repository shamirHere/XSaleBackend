import { AsyncHandler, ApiResponse } from "../../../utils/index.js";
import Item from "../../../models/listing/items/items.models.js";
import { Poultry } from "../../../models/category/index.js";
import { Chicken } from "../../../models/listing/poultry/index.js";

const createChicken = AsyncHandler(async (req, res) => {
  const {
    user,
    productType,
    breed,
    type,
    hasPoultryFarm,
    sellerType,
    quantityType,
    additionalInformation,
    media,
    location,
    askingPrice,
  } = req.body;

  try {
    if (!user) {
      return res.status(400, user, "id of the user is required");
    } else if (!productType) {
      return res
        .status(400)
        .json(new ApiResponse(400, productType, "product type is required"));
    } else if (!breed) {
      return res
        .status(400)
        .json(new ApiResponse(400, breed, "breed of the chicken is required"));
    } else if (!type) {
      return res
        .status(400)
        .json(new ApiResponse(400, breed, "type of the chicken is required"));
    } else if (!quantityType) {
      return res
        .status(400)
        .json(new ApiResponse(400, quantityType, "quantity type  is required"));
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
          new ApiResponse(400, location, "location of the chicken is required")
        );
    } else if (!askingPrice) {
      return res
        .status(400)
        .json(new ApiResponse(400, askingPrice, "asking price is required"));
    } else {
      const newChicken = new Chicken(req.body);
      const savedChicken = await newChicken.save();
      const chicken_location_user = await Chicken.find(
        savedChicken._id
      ).populate({
        path: "user",
        populate: { path: "location" },
      });
      const item = new Item({
        item: chicken_location_user,
        location: chicken_location_user[0].location,
      });
      const savedInItems = await item.save();
      const saveInCategory = new Poultry({
        item: chicken_location_user,
        location: chicken_location_user[0].location,
      });
      const savedInCategory = await saveInCategory.save();
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            chicken_location_user,
            "new chicken created successfully"
          )
        );
    }
  } catch (error) {
    console.log(`error while creating chicken ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while creating new chicken"));
  }
});

const getAllChickens = AsyncHandler(async (req, res) => {
  try {
    const chickens = await Chicken.find().populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(new ApiResponse(200, chickens, "these are all the chickens"));
  } catch (error) {
    console.log(`error while fetching all chickens ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fetching all chickens"));
  }
});

const getSingleChicken = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the chicken")
        );
    }
    const chicken = await Chicken.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!chicken) {
      return res
        .status(404)
        .json(new ApiResponse(404, chicken, "the chicken does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, chicken, "chicken fetched successfully"));
  } catch (error) {
    console.log(`error while fetching single chicken ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fetching single chicken"));
  }
});

const updateChicken = AsyncHandler(async (req, res) => {
  const {
    _id,
    productType,
    breed,
    type,
    hasPoultryFarm,
    sellerType,
    quantityType,
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
    const updatedChicken = await Chicken.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedChicken) {
      return res
        .status(404)
        .json(new ApiResponse(404, updatedChicken, "chicken not found"));
    } else if (updatedChicken) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedChicken,
            "your listing for this chicken updated"
          )
        );
    }
  } catch (error) {
    console.log(`error while updating chicken ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while updating chicken"));
  }
});

const deleteChicken = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedChicken = await Chicken.findByIdAndDelete(_id);
    if (!deletedChicken) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "chicken does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "chicken deleted successfully"));
  } catch (error) {
    console.log(`error while deleting chicken ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while deleting chicken"));
  }
});

export {
  createChicken,
  getAllChickens,
  getSingleChicken,
  updateChicken,
  deleteChicken,
};
