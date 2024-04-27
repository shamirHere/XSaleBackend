import { CoolerFan } from "../../../models/listing/electronics/index.js";
import { AsyncHandler, ApiResponse } from "../../../utils/index.js";
import Item from "../../../models/listing/items/items.models.js";
import { Electronics } from "../../../models/category/index.js";

const createCoolerFan = AsyncHandler(async (req, res) => {
  const {
    user,
    productType,
    type,
    brand,
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
    } else if (!type) {
      return res
        .status(400)
        .json(new ApiResponse(400, type, "type is required"));
    } else if (!brand) {
      return res
        .status(400)
        .json(new ApiResponse(400, brand, "brand is required"));
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
            "location of the cooler/fan is required"
          )
        );
    } else if (!askingPrice) {
      return res
        .status(400)
        .json(new ApiResponse(400, askingPrice, "asking price is required"));
    } else {
      const newCooler_fan = new CoolerFan(req.body);
      const savedCooler_fan = await newCooler_fan.save();
      const coolerFan_location_user = await CoolerFan.find(
        savedCooler_fan._id
      ).populate({ path: "user", populate: { path: "location" } });
      const item = new Item({
        item: coolerFan_location_user,
        location: coolerFan_location_user[0].location,
      });
      const savedInItems = await item.save();
      const saveInCategory = new Electronics({
        item: coolerFan_location_user,
        location: coolerFan_location_user[0].location,
      });
      const savedInCategory = await saveInCategory.save();

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            coolerFan_location_user,
            "cooler / fan listing created successfully"
          )
        );
    }
  } catch (error) {
    console.log(`error while creating a new cooler fan ${error}`);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while creating the new cooler/fan"
        )
      );
  }
});

const getAllCoolerFans = AsyncHandler(async (req, res) => {
  try {
    const coolers_fans = await CoolerFan.find().populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(
        new ApiResponse(200, coolers_fans, "these are all the cooler fans")
      );
  } catch (error) {
    console.log("error while fetching all the coolers fans", error);
    return res
      .status(500)
      .json(
        new ApiResponse(500, error, "error while fetching all the coolers fans")
      );
  }
});

const getSingleCoolerFan = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const coolerFan = await CoolerFan.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!coolerFan) {
      return res
        .status(404)
        .json(
          new ApiResponse(404, coolerFan, "the cooler / fan does not exist")
        );
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, coolerFan, "cooler / fan fetched successfully")
      );
  } catch (error) {
    console.log("error while fetching single cooler / fan", error);
    return res
      .status(500)
      .json(
        new ApiResponse(500, error, "error while fething single cooler/fan")
      );
  }
});
const updateCoolerFan = AsyncHandler(async (req, res) => {
  const {
    _id,
    type,
    brand,
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
    const updatedCoolerFan = await CoolerFan.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedCoolerFan) {
      return res
        .status(404)
        .json(new ApiResponse(404, updatedCoolerFan, "cooler / fan not found"));
    } else if (updatedCoolerFan) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedCoolerFan,
            "your listing for this cooler / fan updated"
          )
        );
    }
  } catch (error) {
    console.log("error while updating the cooler / fan ", error);
    return res
      .status(500)
      .json(new ApiResponse(500, "", "erorr while updating the cooler / fan"));
  }
});
const deleteCoolerFan = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedCoolerFan = await CoolerFan.findByIdAndDelete(_id);
    if (!deletedCoolerFan) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "cooler / fan does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "cooler / fan deleted successfully"));
  } catch (error) {
    console.log("error while deleting the cooler / fan ", error);
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while deleting cooler / fan"
        )
      );
  }
});

export {
  createCoolerFan,
  getAllCoolerFans,
  getSingleCoolerFan,
  updateCoolerFan,
  deleteCoolerFan,
};
