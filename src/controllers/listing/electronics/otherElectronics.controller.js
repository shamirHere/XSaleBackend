import { AsyncHandler, ApiResponse } from "../../../utils/index.js";
import OtherElectronics from "../../../models/listing/electronics/otherElectronics.model.js";
import Item from "../../../models/listing/items/items.models.js";
import { Electronics } from "../../../models/category/index.js";

const createOtherElectronics = AsyncHandler(async (req, res) => {
  const {
    user,
    productType,
    name,
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
    } else if (!productType) {
      return res
        .status(400)
        .json(new ApiResponse(400, productType, "product type is required"));
    } else if (!name) {
      return res
        .status(400)
        .json(new ApiResponse(400, name, "title is required"));
    } else if (!additionalInformation) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            additionalInformation,
            "additionalInformation is required"
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
          new ApiResponse(
            400,
            location,
            "location of the game / entertainment is required"
          )
        );
    } else if (!askingPrice) {
      return res
        .status(400)
        .json(new ApiResponse(400, askingPrice, "asking price is required"));
    } else {
      const newOtherElectronics = new OtherElectronics(req.body);
      const savedOtherElectronics = await newOtherElectronics.save();
      const otherElectronics_location_user = await OtherElectronics.find(
        savedOtherElectronics._id
      ).populate({ path: "user" });
      const item = new Item({
        item: otherElectronics_location_user,
        location: otherElectronics_location_user[0].location,
      });
      const savedInItems = await item.save();
      const saveInCategory = new Electronics({
        item: otherElectronics_location_user,
        location: otherElectronics_location_user[0].location,
      });
      const savedInCategory = await saveInCategory.save();
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            otherElectronics_location_user,
            "game / entertainment listing created successfully"
          )
        );
    }
  } catch (error) {
    console.log(`error while creating a new otherElectronics ${error}`);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while creating the new otherElectronics"
        )
      );
  }
});
const getAllcreateOtherElectronics = AsyncHandler(async (req, res) => {
  try {
    const otherElectronics = await OtherElectronics.find().populate({
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
          otherElectronics,
          "these are all the otherElectronics"
        )
      );
  } catch (error) {
    console.log("error while fetching all the otherElectronics", error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "error while fetching all the otherElectronics "
        )
      );
  }
});
const getSingleOtherElectronics = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const otherElectronics = await OtherElectronics.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!OtherElectronics) {
      return res
        .status(404)
        .json(
          new ApiResponse(
            404,
            OtherElectronics,
            "the Other Electronics does not exist"
          )
        );
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          OtherElectronics,
          "OtherElectronics fetched successfully"
        )
      );
  } catch (error) {
    console.log("error while fetching single game entertainment", error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "error while fething single game/emtertainment"
        )
      );
  }
});
const updateOtherElectronics = AsyncHandler(async (req, res) => {
  const { _id, title, description, media, location, askingPrice } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "_id the of the document is required"));
    }
    const updatedOtherElectronics = await OtherElectronics.findByIdAndUpdate(
      _id,
      req.body,
      {
        new: true,
      }
    );
    if (!OtherElectronics) {
      return res
        .status(404)
        .json(
          new ApiResponse(404, OtherElectronics, "OtherElectronics not found")
        );
    } else if (OtherElectronics) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            OtherElectronics,
            "your listing for this game / entertainment updated"
          )
        );
    }
  } catch (error) {
    console.log("error while updating the game/entertainment", error);
    return res
      .status(500)
      .json(
        new ApiResponse(500, "", "erorr while updating the game/entertainment")
      );
  }
});
const deleteOtherElectronics = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedOtherElectronics = await OtherElectronics.findByIdAndDelete(
      _id
    );
    if (!OtherElectronics) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "game / entertainment does not exist"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, "", "game / entertainment deleted successfully")
      );
  } catch (error) {
    console.log("error while deleting the game / entertainment", error);
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while game / entertainment"
        )
      );
  }
});

export {
  createOtherElectronics,
  getAllcreateOtherElectronics,
  getSingleOtherElectronics,
  updateOtherElectronics,
  deleteOtherElectronics,
};
