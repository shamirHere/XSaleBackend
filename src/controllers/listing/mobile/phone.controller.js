import { AsyncHandler, ApiResponse } from "../../../utils/index.js";
import { Phone } from "../../../models/listing/mobile/index.js";
import Item from "../../../models/listing/items/items.models.js";

const createPhone = AsyncHandler(async (req, res) => {
  const {
    user,
    productType,
    brand,
    model,
    internalStorage,
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
    } else if (!productType) {
      return res
        .status(400)
        .json(new ApiResponse(400, productType, "product type is required"));
    } else if (!brand) {
      return res
        .status(400)
        .json(new ApiResponse(400, brand, " brand of the phone is required"));
    } else if (!model) {
      return res
        .status(400)
        .json(new ApiResponse(400, model, "model of the phone is required"));
    } else if (!ram) {
      return res
        .status(400)
        .json(new ApiResponse(400, ram, "ram of the phone is required"));
    } else if (!internalStorage) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            internalStorage,
            "internal storage of the phone is required"
          )
        );
    } else if (!oldInMonths) {
      return res
        .status(400)
        .json(new ApiResponse(400, oldInMonths, "old in months is required"));
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
          new ApiResponse(400, location, "location of the phone is required")
        );
    } else if (!askingPrice) {
      return res
        .status(400)
        .json(new ApiResponse(400, askingPrice, "asking price is required"));
    } else {
      const newPhone = new Phone(req.body);
      const savedPhone = await newPhone.save();
      const phone_location_user = await Phone.findById(savedPhone._id).populate(
        {
          path: "user",
          populate: {
            path: "location",
          },
        }
      );
      const item = new Item({
        item: phone_location_user,
        location: phone_location_user[0].location,
      });
      const savedInItems = await item.save();
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            phone_location_user,
            "new phone created successfully"
          )
        );
    }
  } catch (error) {
    console.log(`error while creating new phone ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while creating new phone"));
  }
});
const getAllPhone = AsyncHandler(async (req, res) => {
  try {
    const phones = await Phone.find().populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(new ApiResponse(200, phones, "these are all the phones"));
  } catch (error) {
    console.log("error while fetching all phones", error);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fething all phones"));
  }
});
const getSinglePhone = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "please provide the id of the phone"));
    }
    const phone = await Phone.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!phone) {
      return res
        .status(404)
        .json(new ApiResponse(404, phone, "the phone does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, phone, "phone fetched successfully"));
  } catch (error) {
    console.log("error while fetching single phone ", error);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fething single phone"));
  }
});
const updatePhone = AsyncHandler(async (req, res) => {
  const {
    _id,
    brand,
    model,
    internalStorage,
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
    const updatedPhone = await Phone.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedPhone) {
      return res
        .status(404)
        .json(new ApiResponse(404, updatedPhone, "phone not found"));
    } else if (updatedPhone) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedPhone,
            "your listing for this phone updated"
          )
        );
    }
  } catch (error) {
    console.log("error while updating the phone", error);
    return res
      .status(500)
      .json(new ApiResponse(500, "", "erorr while updating the phone"));
  }
});
const deletePhone = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedPhone = await Phone.findByIdAndDelete(_id);
    if (!deletedPhone) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "Phone does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "phone deleted successfully"));
  } catch (error) {
    console.log("error while deleting the phone", error);
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while deleting phone"
        )
      );
  }
});

export { createPhone, getAllPhone, getSinglePhone, updatePhone, deletePhone };
