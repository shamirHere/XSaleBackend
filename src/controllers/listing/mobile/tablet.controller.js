import { AsyncHandler, ApiResponse } from "../../../utils/index.js";
import { Tablet } from "../../../models/listing/mobile/index.js";
import Item from "../../../models/listing/items/items.models.js";
import { Mobiles } from "../../../models/category/index.js";

const createTablet = AsyncHandler(async (req, res) => {
  const {
    user,
    categoryName,
    productType,
    brand,
    model,
    oldInMonths,
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
    } else if (!brand) {
      return res
        .status(400)
        .json(new ApiResponse(400, brand, " brand of the tablet is required"));
    } else if (!model) {
      return res
        .status(400)
        .json(new ApiResponse(400, model, "model of the tablet is required"));
    } else if (!oldInMonths) {
      return res
        .status(400)
        .json(new ApiResponse(400, oldInMonths, "old in months is required"));
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
          new ApiResponse(400, location, "location of the tablet is required")
        );
    } else if (!askingPrice) {
      return res
        .status(400)
        .json(new ApiResponse(400, askingPrice, "asking price is required"));
    } else {
      const newTablet = new Tablet(req.body);
      const savedTablet = await newTablet.save();
      const tablet_location_user = await Tablet.findById(
        savedTablet._id
      ).populate({
        path: "user",
      });
      const item = new Item({
        item: tablet_location_user,
        location: tablet_location_user.location,
      });
      const savedInItems = await item.save();
      const saveInCategory = new Mobiles({
        item: tablet_location_user,
        location: tablet_location_user.location,
      });
      const savedInCategory = await saveInCategory.save();
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            tablet_location_user,
            "new tablet created successfully"
          )
        );
    }
  } catch (error) {
    console.log(`error while creating new tablet ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while creating new tablet"));
  }
});
const getAllTablet = AsyncHandler(async (req, res) => {
  try {
    const tablets = await Tablet.find().populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(new ApiResponse(200, tablets, "these are all the tablets"));
  } catch (error) {
    console.log("error while fetching all tablets", error);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fething all tablets"));
  }
});
const getSingleTablet = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "please provide the id of the tablet"));
    }
    const tablet = await Tablet.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!tablet) {
      return res
        .status(404)
        .json(new ApiResponse(404, tablet, "the tablet does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, tablet, "tablet fetched successfully"));
  } catch (error) {
    console.log("error while fetching single tablet ", error);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fething single tablet"));
  }
});
const updateTablet = AsyncHandler(async (req, res) => {
  const {
    _id,
    brand,
    model,
    oldInMonths,
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
    const updatedTablet = await Tablet.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedTablet) {
      return res
        .status(404)
        .json(new ApiResponse(404, updatedTablet, "tablet not found"));
    } else if (updatedTablet) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedTablet,
            "your listing for this tablet updated"
          )
        );
    }
  } catch (error) {
    console.log("error while updating the tablet", error);
    return res
      .status(500)
      .json(new ApiResponse(500, "", "erorr while updating the tablet"));
  }
});
const deleteTablet = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedTablet = await Tablet.findByIdAndDelete(_id);
    if (!deletedTablet) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "tablet does not exist"));
    }
  } catch (error) {
    console.log("error while deleting the tablet", error);
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while deleting tablet"
        )
      );
  }
});

export {
  createTablet,
  getAllTablet,
  getSingleTablet,
  updateTablet,
  deleteTablet,
};
