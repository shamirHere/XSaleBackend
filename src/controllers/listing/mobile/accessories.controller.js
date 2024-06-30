import { AsyncHandler, ApiResponse } from "../../../utils/index.js";
import { Accessories } from "../../../models/listing/mobile/index.js";
import Item from "../../../models/listing/items/items.models.js";
import { Mobiles } from "../../../models/category/index.js";
const createAccessories = AsyncHandler(async (req, res) => {
  const {
    user,
    categoryName,
    productType,
    accessoriesType,
    brand,
    model,
    monthsOld,
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
    } else if (!categoryName) {
      return res
        .status(400)
        .json(new ApiResponse(400, categoryName, "category name is required"));
    } else if (!productType) {
      return res
        .status(400)
        .json(new ApiResponse(400, productType, "product type is required"));
    } else if (!accessoriesType) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, accessoriesType, "accessories type is required")
        );
    } else if (!brand) {
      return res
        .status(400)
        .json(new ApiResponse(400, brand, "brand is required"));
    } else if (!model) {
      return res
        .status(400)
        .json(new ApiResponse(400, model, "model is required"));
    } else if (!monthsOld) {
      return res
        .status(400)
        .json(new ApiResponse(400, monthsOld, "months Old is required"));
    } else if (!media) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, media, "atleast one image or video is required")
        );
    } else if (!location) {
      return res
        .status(400)
        .json(new ApiResponse(400, location, "location is required"));
    } else if (!askingPrice) {
      return res
        .status(400)
        .json(new ApiResponse(400, askingPrice, "asking price is required"));
    } else {
      const newAccessories = new Accessories(req.body);
      const savedAccessories = await newAccessories.save();
      const accessories_location_user = await Accessories.findById(
        savedAccessories._id
      ).populate({
        path: "user",
      });
      const item = new Item({
        item: accessories_location_user,
        location: accessories_location_user.location,
      });
      const savedInItems = await item.save();
      const saveInCategory = new Mobiles({
        item: accessories_location_user,
        location: accessories_location_user.location,
      });
      const savedInCategory = await saveInCategory.save();
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            accessories_location_user,
            "new accessories machine created successfully"
          )
        );
    }
  } catch (error) {
    console.log(`error while creating new accessories ${error}`);
    return res
      .status(200)
      .json(
        new ApiResponse(200, error, "error while creating new accessories")
      );
  }
});
const getAllAccessories = AsyncHandler(async (req, res) => {
  try {
    const accessories = await Accessories.find().populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(new ApiResponse(200, accessories, "these are all the accessories"));
  } catch (error) {
    console.log("error while fetching all accessories", error);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fething all accessories"));
  }
});
const getSingleAccessories = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the accessories")
        );
    }
    const accessories = await Accessories.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!accessories) {
      return res
        .status(404)
        .json(
          new ApiResponse(404, accessories, "the accessories does not exist")
        );
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, accessories, "accessories fetched successfully")
      );
  } catch (error) {
    console.log("error while fetching single accessories", error);
    return res
      .status(500)
      .json(
        new ApiResponse(500, error, "error while fething single accessories")
      );
  }
});
const updateAccessories = AsyncHandler(async (req, res) => {
  const {
    _id,
    accessoriesType,
    brand,
    model,
    otherDetails,
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
    const updatedAccessories = await Accessories.findByIdAndUpdate(
      _id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedAccessories) {
      return res
        .status(404)
        .json(
          new ApiResponse(404, updatedAccessories, "accessories not found")
        );
    } else if (updatedAccessories) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedAccessories,
            "your listing for this accessories updated"
          )
        );
    }
  } catch (error) {
    console.log("error while updating the accessories", error);
    return res
      .status(500)
      .json(new ApiResponse(500, "", "erorr while updating the accessories"));
  }
});
const deleteAccessories = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedAccessories = await Accessories.findByIdAndDelete(_id);
    if (!deletedAccessories) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "accessories not exist"));
    }
  } catch (error) {
    onsole.log("error while deleting the accessories", error);
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while deleting accessories"
        )
      );
  }
});

export {
  createAccessories,
  getAllAccessories,
  getSingleAccessories,
  updateAccessories,
  deleteAccessories,
};
