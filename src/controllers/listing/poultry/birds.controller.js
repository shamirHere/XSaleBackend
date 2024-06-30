import { AsyncHandler, ApiResponse } from "../../../utils/index.js";
import Item from "../../../models/listing/items/items.models.js";
import { Poultry } from "../../../models/category/index.js";
import Bird from "../../../models/listing/poultry/Birds.model.js";

const createBird = AsyncHandler(async (req, res) => {
  const {
    user,
    categoryName,
    productType,
    type,
    name,
    quantityType,
    additionalInformation,
    media,
    location,
    askingPrice,
  } = req.body;
  try {
    if (!user) {
      console.log("here");
      return res
        .status(400)
        .json(new ApiResponse(400, user, "id of the user is required"));
    } else if (!categoryName) {
      return res
        .status(400)
        .json(new ApiResponse(400, categoryName, "category name is required"));
    } else if (!productType) {
      return res
        .status(400)
        .json(new ApiResponse(400, productType, "product type is required"));
    } else if (!type) {
      return res
        .status(400)
        .json(new ApiResponse(400, type, "type of the bird is required"));
    } else if (!name) {
      return res
        .status(400)
        .json(new ApiResponse(400, name, "name of the bird is required"));
    } else if (!quantityType) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            quantityType,
            "quantity type of the bird is required"
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
          new ApiResponse(400, location, "location of the bird is required")
        );
    } else if (!askingPrice) {
      return res
        .status(400)
        .json(new ApiResponse(400, askingPrice, "asking price is required"));
    } else {
      const newBird = new Bird(req.body);
      const savedBird = await newBird.save();
      const bird_location_user = await Bird.find(savedBird._id).populate({
        path: "user",
      });
      const item = new Item({
        item: bird_location_user,
        location: bird_location_user[0].location,
      });
      const savedInItems = await item.save();
      const saveInCategory = new Poultry({
        item: bird_location_user,
        location: bird_location_user[0].location,
      });
      const savedInCategory = await saveInCategory.save();
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            bird_location_user,
            "new bird created successfully"
          )
        );
    }
  } catch (error) {
    console.log(`error while creating bird ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while creating new bird"));
  }
});

const getAllBirds = AsyncHandler(async (req, res) => {
  try {
    const birds = await Bird.find().populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(new ApiResponse(200, birds, "these are all the birds"));
  } catch (error) {
    console.log(`error while fetching all bird ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fetching all bird "));
  }
});

const getSingleBird = AsyncHandler(async (req, res) => {
  const { _id } = req.body;

  try {
    if (!_id) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "please provide the id of the bird"));
    }
    const bird = await Bird.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!bird) {
      return res
        .status(404)
        .json(new ApiResponse(404, bird, "the bird does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, bird, "bird fetched successfully"));
  } catch (error) {
    console.log(`error while fetching single bird ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fetching single bird"));
  }
});

const updateBird = AsyncHandler(async (req, res) => {
  const {
    _id,
    productType,
    type,
    name,
    quantity,
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
    const updatedBird = await Bird.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedBird) {
      return res
        .status(404)
        .json(new ApiResponse(404, updatedBird, "bird not found"));
    } else if (updatedBird) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedBird,
            "your listing for this bird updated"
          )
        );
    }
  } catch (error) {
    console.log(`error while updating bird ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while updating bird"));
  }
});

const deleteBird = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedBird = await Bird.findByIdAndDelete(_id);
    if (!deletedBird) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "bird does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "bird deleted successfully"));
  } catch (error) {
    console.log(`error while deleting bird ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while deleting bird"));
  }
});

export { createBird, getAllBirds, getSingleBird, updateBird, deleteBird };
