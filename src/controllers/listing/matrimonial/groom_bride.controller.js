import { AsyncHandler, ApiResponse } from "../../../utils/index.js";
import BrideGroom from "../../../models/listing/matrimonial/index.js";
import Item from "../../../models/listing/items/items.models.js";

const createBride_Groom = AsyncHandler(async (req, res) => {
  const {
    user,
    productType,
    type,
    name,
    age,
    height,
    maritialStatus,
    religion,
    caste,
    educationQualification,
    currentOccupation,
    additionalInformation,
    motherTounge,
    media,
    location,
  } = req.body;
  try {
    if (!user) {
      return res
        .status(400)
        .json(new ApiResponse(400, user, "_id of the user is required"));
    } else if (!productType) {
      return res
        .status(400)
        .json(new ApiResponse(400, productType, "product type is required"));
    } else if (!type) {
      return res
        .status(400)
        .json(new ApiResponse(400, type, "type is required"));
    } else if (!name) {
      return res
        .status(400)
        .json(new ApiResponse(400, name, "name is required"));
    } else if (!age) {
      return res.status(400).json(new ApiResponse(400, age, "age is required"));
    } else if (!height) {
      return res
        .status(400)
        .json(new ApiResponse(400, age, "height is required"));
    } else if (!maritialStatus) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, maritialStatus, "maritialStatus is required")
        );
    } else if (!religion) {
      return res
        .status(400)
        .json(new ApiResponse(400, religion, "religion is required"));
    } else if (!educationQualification) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            educationQualification,
            "education qualification is required"
          )
        );
    } else if (!currentOccupation) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            currentOccupation,
            "cureent occupation is required"
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
        .json(
          new ApiResponse(
            400,
            location,
            "location of the bride/groom is required"
          )
        );
    } else {
      const newBride_Groom = new BrideGroom(req.body);
      const savedBride_Groom = await newBride_Groom.save();
      const brideGroom_location_user = await BrideGroom.findById(
        savedBride_Groom._id
      ).populate({
        path: "user",
        populate: {
          path: "location",
        },
      });
      const item = new Item({
        item: brideGroom_location_user,
        location: brideGroom_location_user[0].location,
      });
      const savedInItems = await item.save();
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            brideGroom_location_user,
            "new bride / groom created successfully"
          )
        );
    }
  } catch (error) {
    console.log(`error while creating new bride/groom ${error}`);
    return res
      .status(500)
      .json(
        new ApiResponse(500, error, "error while creating new bride/groom")
      );
  }
});
const getAllBride_Groom = AsyncHandler(async (req, res) => {
  try {
    const brides_grooms = await BrideGroom.find().populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(
        new ApiResponse(200, brides_grooms, "these are all the brides/grooms")
      );
  } catch (error) {
    console.log("error while fetching all bride/groom", error);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fething all bride/groom"));
  }
});
const getSingleBride_Groom = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            _id,
            "please provide the id of the bride / groom"
          )
        );
    }
    const brideGroom = await BrideGroom.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!brideGroom) {
      return res
        .status(404)
        .json(
          new ApiResponse(404, brideGroom, "the bride/groom does not exist")
        );
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, brideGroom, "bride/groom fetched successfully")
      );
  } catch (error) {
    console.log("error while fetching single bride/groom", error);
    return res
      .status(500)
      .json(
        new ApiResponse(500, error, "error while fething single bride groom")
      );
  }
});
const updateBride_Groom = AsyncHandler(async (req, res) => {
  const {
    _id,
    type,
    name,
    age,
    height,
    maritialStatus,
    religion,
    caste,
    educationQualification,
    currentOccupation,
    additionalInformation,
    motherTounge,
    media,
    location,
  } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "_id the of the document is required"));
    }
    const updatedBride_Groom = await BrideGroom.findByIdAndUpdate(
      _id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedBride_Groom) {
      return res
        .status(404)
        .json(
          new ApiResponse(404, updatedBride_Groom, "bride / groom not found")
        );
    } else if (updatedBride_Groom) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedBride_Groom,
            "your listing for this bride/groom updated"
          )
        );
    }
  } catch (error) {
    console.log("error while updating the bride/groom", error);
    return res
      .status(500)
      .json(new ApiResponse(500, "", "erorr while updating the bride/groom"));
  }
});
const deleteBride_Groom = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedBride_Groom = await BrideGroom.findByIdAndDelete(_id);
    if (!deletedDog) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "bride/groom does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "bride/groom deleted successfully"));
  } catch (error) {
    console.log("error while deleting the bride/groom ", error);
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while deleting bride/groom"
        )
      );
  }
});

export {
  createBride_Groom,
  getAllBride_Groom,
  getSingleBride_Groom,
  updateBride_Groom,
  deleteBride_Groom,
};
