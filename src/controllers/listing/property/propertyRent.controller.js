import { ApiError, AsyncHandler } from "../../../utils/index.js";
import {
  PropertyRent,
  Property,
} from "../../../models/listing/property/index.js";
import Item from "../../../models/listing/items/items.models.js";
import { PropertiesRent, Properties } from "../../../models/category/index.js";

const createPropertyRent = AsyncHandler(async (req, res) => {
  const {
    user,
    productType,
    type,
    propertyName,
    bedroom,
    bathroom,
    furnishing,
    listedBy,
    carpetArea,
    floorInBuilding,
    whichFloor,
    liftAvailable,
    parkingAvailable,
    additionalInformatiom,
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
    } else if (!type) {
      return res
        .status(400)
        .json(new ApiResponse(400, type, "type of the property is required"));
    } else if (!propertyName) {
      return res
        .status(400)
        .json(new ApiResponse(400, propertyName, "property name is required"));
    } else if (!bedroom) {
      return res
        .status(400)
        .json(new ApiResponse(400, bedroom, "no of bedroom is required"));
    } else if (!bathroom) {
      return res
        .status(400)
        .json(new ApiResponse(400, bathroom, "no of bathroom is required"));
    } else if (!furnishing) {
      return res
        .status(400)
        .json(new ApiResponse(400, furnishing, "furnishing is required"));
    } else if (!listedBy) {
      return res
        .status(400)
        .json(new ApiResponse(400, listedBy, "listed by required"));
    } else if (!floorInBuilding) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            floorInBuilding,
            "floor in building is required required"
          )
        );
    } else if (!whichFloor) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            whichFloor,
            "which floor in building is required required"
          )
        );
    } else if (!liftAvailable) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            liftAvailable,
            "lift available in building is required required"
          )
        );
    } else if (!parkingAvailable) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            parkingAvailable,
            "parking available in building is required required"
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
          new ApiResponse(400, location, "location of the property is required")
        );
    } else if (!askingPrice) {
      return res
        .status(400)
        .json(new ApiResponse(400, askingPrice, "asking price is required"));
    } else {
      const newPropertyRent = new PropertyRent(req.body);
      const savedPropertyRent = await newPropertyRent.save();
      const propertyRent_location_user = await PropertyRent.find(
        savedPropertyRent._id
      ).populate({
        path: "user",
        populate: {
          path: "location",
        },
      });
      const item = new Item({
        item: propertyRent_location_user,
        location: propertyRent_location_user[0].location,
      });
      const savedInItems = await item.save();
      if (propertyRent_location_user[0].sellingType === "for sale") {
        const saveInCategory = new Properties({
          item: propertyRent_location_user,
          location: propertyRent_location_user[0].location,
        });
        const savedInCategory = await saveInCategory.save();
      } else if (propertyRent_location_user[0].sellingType === "for rent") {
        const saveInCategory = new PropertiesRent({
          item: propertyRent_location_user,
          location: propertyRent_location_user[0].location,
        });
        const savedInCategory = await saveInCategory.save();
      }
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            propertyRent_location_user,
            "new property rent created successfully"
          )
        );
    }
  } catch (error) {
    console.log(`error while creating rent property ${error}`);
    return res
      .status(500)
      .json(
        new ApiResponse(500, error, "error while creating new rent property")
      );
  }
});

const getAllPropertiesRent = AsyncHandler(async (req, res) => {
  try {
    const propertiesRent = await PropertyRent.find({}).populate({
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
          propertiesRent,
          "these are all the properties rent"
        )
      );
  } catch (error) {
    console.log(`error while fetching all rent property ${error}`);
    return res
      .status(500)
      .json(
        new ApiResponse(500, error, "error while fetching all rent property")
      );
  }
});

const getSinglePropertyRent = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the property")
        );
    }
    const propertyRent = await Property.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!propertyRent) {
      return res
        .status(404)
        .json(
          new ApiResponse(404, propertyRent, "the property rent does not exist")
        );
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, propertyRent, "property rent fetched successfully")
      );
  } catch (error) {
    console.log(`error while fetching single rent property ${error}`);
    return res
      .status(500)
      .json(
        new ApiResponse(500, error, "error while fetching single rent property")
      );
  }
});

const updatePropertyRent = AsyncHandler(async (req, res) => {
  const {
    _id,
    productType,
    type,
    propertyName,
    bedroom,
    bathroom,
    furnishing,
    listedBy,
    carpetArea,
    floorInBuilding,
    whichFloor,
    liftAvailable,
    parkingAvailable,
    additionalInformatiom,
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
    const updatedPropertyRent = await PropertyRent.findByIdAndUpdate(
      _id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedPropertyRent) {
      return res
        .status(404)
        .json(
          new ApiResponse(404, updatedPropertyRent, "property rent not found")
        );
    } else if (updatedPropertyRent) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedPropertyRent,
            "your listing for this rent property updated"
          )
        );
    }
  } catch (error) {
    console.log(`error while updating rent property ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while updating rent property"));
  }
});

const deletePropertyRent = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedPropertyRent = await PropertyRent.findByIdAndDelete(_id);
    if (!deletedPropertyRent) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "property does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "property rent deleted successfully"));
  } catch (error) {
    console.log(`error while deleting rent property ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while deleting rent property"));
  }
});

export {
  createPropertyRent,
  getAllPropertiesRent,
  getSinglePropertyRent,
  updatePropertyRent,
  deletePropertyRent,
};
