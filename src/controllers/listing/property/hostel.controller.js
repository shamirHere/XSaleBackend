import { ApiResponse, AsyncHandler } from "../../../utils/index.js";
import { Hostel } from "../../../models/listing/property/index.js";
import Item from "../../../models/listing/items/items.models.js";
import { PropertiesRent } from "../../../models/category/index.js";

const createHostel = AsyncHandler(async (req, res) => {
  const {
    user,
    categoryName,
    productType,
    type,
    availableFor,
    mealIncludes,
    roomSharing,
    bathroom,
    listedBy,
    carpetArea,
    totalFloor,
    whichFloor,
    liftAvailable,
    parkingAvailable,
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
    } else if (!type) {
      return res
        .status(400)
        .json(new ApiResponse(400, type, "type of the hostel is required"));
    } else if (!availableFor) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            availableFor,
            "available of the hostel is required"
          )
        );
    } else if (!mealIncludes) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            mealIncludes,
            "meal includes info of the hostel is required"
          )
        );
    } else if (!roomSharing) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            roomSharing,
            "roomSharing info of the hostel is required"
          )
        );
    } else if (!bathroom) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            bathroom,
            "bathroom info of the hostel is required"
          )
        );
    } else if (!listedBy) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            listedBy,
            "listed by info of the hostel is required"
          )
        );
    } else if (!carpetArea) {
      return res
        .status(400)
        .json(new ApiResponse(400, carpetArea, "carpet area is required"));
    } else if (!totalFloor) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            totalFloor,
            "floor in building info of the hostel is required"
          )
        );
    } else if (!whichFloor) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            whichFloor,
            "whichFloor info of the hostel is required"
          )
        );
    } else if (!liftAvailable) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            liftAvailable,
            "lift available info of the hostel is required"
          )
        );
    } else if (!parkingAvailable) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            parkingAvailable,
            "parking available info of the hostel is required"
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
          new ApiResponse(400, location, "location of the hostel is required")
        );
    } else if (!askingPrice) {
      return res
        .status(400)
        .json(new ApiResponse(400, askingPrice, "asking price is required"));
    } else {
      const newHostel = new Hostel(req.body);
      const savedHostel = await newHostel.save();
      const hostel_location_user = await Hostel.find(savedHostel._id).populate({
        path: "user",
        populate: {
          path: "location",
        },
      });
      const item = new Item({
        item: hostel_location_user,
        location: hostel_location_user[0].location,
      });
      const savedInItems = await item.save();
      const saveInCategory = new PropertiesRent({
        item: hostel_location_user,
        location: hostel_location_user[0].location,
      });
      const savedInCategory = await saveInCategory.save();
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            hostel_location_user,
            "new hostel created successfully"
          )
        );
    }
  } catch (error) {
    console.log(`error while creating new hostel ${error}`);
    return res
      .status(200)
      .json(new ApiResponse(200, error, "error while creating new hostel"));
  }
});
const getAllHostel = AsyncHandler(async (req, res) => {
  try {
    const hostels = await Hostel.find().populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(new ApiResponse(200, hostels, "these are all the hostels"));
  } catch (error) {
    console.log("error while fetching all the hostels ", error);
    return res
      .status(500)
      .json(
        new ApiResponse(500, error, "error while fetching all the hostels")
      );
  }
});
const getSingleHostel = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "please provide the id of the hostel"));
    }
    const hostel = await Hostel.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!hostel) {
      return res
        .status(404)
        .json(new ApiResponse(404, hostel, "the hostel does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, hostel, "hostel fetched successfully"));
  } catch (error) {
    console.log("error while fetching single hostel", error);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fething single hostel"));
  }
});
const updateHostel = AsyncHandler(async (req, res) => {
  const {
    _id,
    productType,
    type,
    availableFor,
    mealIncludes,
    roomSharing,
    bathroom,
    listedBy,
    carpetArea,
    floorInBuilding,
    whichFloor,
    liftAvailable,
    parkingAvailable,
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
    const updatedHostel = await Hostel.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedHostel) {
      return res
        .status(404)
        .json(new ApiResponse(404, updatedHostel, "hostel not found"));
    } else if (updatedHostel) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedHostel,
            "your listing for this hostel updated"
          )
        );
    }
  } catch (error) {
    console.log("error while updating the hostel", error);
    return res
      .status(500)
      .json(new ApiResponse(500, "", "erorr while updating the hostel"));
  }
});
const deleteHostel = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedHostel = await Hostel.findByIdAndDelete(_id);
    if (!deletedHostel) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "hostel does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "hostel deleted successfully"));
  } catch (error) {
    console.log("error while deleting the hostel", error);
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while deleting hostel"
        )
      );
  }
});

export {
  createHostel,
  getAllHostel,
  getSingleHostel,
  updateHostel,
  deleteHostel,
};
