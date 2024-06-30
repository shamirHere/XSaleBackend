import { AsyncHandler, ApiResponse } from "../../../utils/index.js";
import Item from "../../../models/listing/items/items.models.js";
import { Poultry } from "../../../models/category/index.js";
import { Fish } from "../../../models/listing/poultry/index.js";

const createFish = AsyncHandler(async (req, res) => {
  const {
    user,
    categoryName,
    productType,
    type,
    breed,
    hasFishPound,
    additionalInformation,
    quantityAvailable,
    quantityType,
    media,
    location,
    askingPrice,
  } = req.body;
  try {
    if (!user) {
      return res.status(400, user, "id of the user is required");
    } else if (!categoryName) {
      return res
        .status(400)
        .json(new ApiResponse(400, categoryName, "catgegory name is required"));
    } else if (!productType) {
      return res
        .status(400)
        .json(new ApiResponse(400, productType, "product type is required"));
    } else if (!type) {
      return res
        .status(400)
        .json(new ApiResponse(400, type, "type of the fish is required"));
    } else if (!quantityAvailable) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            quantityAvailable,
            "quantity available is required"
          )
        );
    } else if (!quantityType) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            quantityType,
            "quantity type of the fish is required"
          )
        );
    } else if (!media) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, media, "atleast one image or video is required")
        );
    } else if (!location) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, location, "location of the fish is required")
        );
    } else if (!askingPrice) {
      return res
        .status(400)
        .json(new ApiResponse(400, askingPrice, "asking price is required"));
    } else {
      const newFish = new Fish(req.body);
      const savedFish = await newFish.save();
      const fish_location_user = await Fish.find(savedFish._id).populate({
        path: "user",
      });
      const item = new Item({
        item: fish_location_user,
        location: fish_location_user[0].location,
      });
      const savedInItems = await item.save();
      const saveInCategory = new Poultry({
        item: fish_location_user,
        location: fish_location_user[0].location,
      });
      const savedInCategory = await saveInCategory.save();
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            fish_location_user,
            "new fish created successfully"
          )
        );
    }
  } catch (error) {
    console.log(`error while creating fish ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while creating new fish"));
  }
});

const getAllFishes = AsyncHandler(async (req, res) => {
  try {
    const fishes = await Fish.find().populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(new ApiResponse(200, fishes, "these are all the fishes"));
  } catch (error) {
    console.log(`error while fetching all birds ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fetching all birds"));
  }
});

const getSingleFish = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "please provide the id of the fish"));
    }
    const fish = await Fish.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!fish) {
      return res
        .status(404)
        .json(new ApiResponse(404, fish, "the fish does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, fish, "fish fetched successfully"));
  } catch (error) {
    console.log(`error while fetching single fish ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fetching single fish"));
  }
});

const updateFish = AsyncHandler(async (req, res) => {
  const {
    _id,
    productType,
    type,
    breed,
    hasFishPound,
    sellerType,
    additionalInformation,
    quantityType,
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
    const updatedFish = await Fish.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedFish) {
      return res
        .status(404)
        .json(new ApiResponse(404, updatedFish, "fish not found"));
    } else if (updatedFish) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedFish,
            "your listing for this fish updated"
          )
        );
    }
  } catch (error) {
    console.log(`error while updating fish ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while updating fish"));
  }
});

const deleteFish = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedFish = await Fish.findByIdAndDelete(_id);
    if (!deletedFish) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "fish does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "fish deleted successfully"));
  } catch (error) {
    console.log(`error while deleting fish ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while deleting fish"));
  }
});

export { createFish, getAllFishes, getSingleFish, updateFish, deleteFish };
