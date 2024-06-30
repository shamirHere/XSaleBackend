import { ApiResponse, AsyncHandler } from "../../../utils/index.js";
import { Property } from "../../../models/listing/property/index.js";
import Item from "../../../models/listing/items/items.models.js";
import Properties from "../../../models/category/properties/properties.model.js";

const createProperty = AsyncHandler(async (req, res) => {
  console.log("this function called");
  const {
    user,
    categoryName,
    productType,
    type,
    bedroom,
    bathroom,
    furnishing,
    listedBy,
    carpetArea,
    totalFloor,
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
        .json(new ApiResponse(400, type, "type of the property is required"));
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
    } else if (!carpetArea) {
      return res
        .status(400)
        .json(new ApiResponse(400, carpetArea, "carpetArea by required"));
    } else if (!totalFloor) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            totalFloor,
            "total floor building is required required"
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
          new ApiResponse(400, location, "location of the property is required")
        );
    } else if (!askingPrice) {
      return res
        .status(400)
        .json(new ApiResponse(400, askingPrice, "asking price is required"));
    } else {
      const newProperty = new Property(req.body);
      const savedProperty = await newProperty.save();
      const property_location_user = await Property.find(
        savedProperty._id
      ).populate({
        path: "user",
      });
      const item = new Item({
        item: property_location_user,
        location: property_location_user[0].location,
      });
      const savedInItems = await item.save();
      const saveInCategory = new Properties({
        item: property_location_user[0],
        location: property_location_user[0].location,
      });
      const savedInCategory = await saveInCategory.save();

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            property_location_user,
            "new property created successfully"
          )
        );
    }
  } catch (error) {
    console.log(`error while creating property ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while creating new property"));
  }
});

const getAllProperties = AsyncHandler(async (req, res) => {
  try {
    const properties = await Property.find({}).populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(new ApiResponse(200, properties, "these are all the properties"));
  } catch (error) {
    console.log(`error while fetching all property ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fetching all property"));
  }
});

const getSingleProperty = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the property")
        );
    }
    const property = await Property.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!property) {
      return res
        .status(404)
        .json(new ApiResponse(404, property, "the property does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, property, "property fetched successfully"));
  } catch (error) {
    console.log(`error while fetching single property ${error}`);
    return res
      .status(500)
      .json(
        new ApiResponse(500, error, "error while fetching single property")
      );
  }
});

const updateProperty = AsyncHandler(async (req, res) => {
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
    const updatedProperty = await Property.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedProperty) {
      return res
        .status(404)
        .json(new ApiResponse(404, updatedProperty, "property not found"));
    } else if (updatedProperty) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedProperty,
            "your listing for this property updated"
          )
        );
    }
  } catch (error) {
    console.log(`error while updating property ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while updating property"));
  }
});

const deleteProperty = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedProperty = await Property.findByIdAndDelete(_id);
    if (!deletedProperty) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "property does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "property deleted successfully"));
  } catch (error) {
    console.log(`error while deleting property ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while deleting property"));
  }
});

export {
  createProperty,
  getAllProperties,
  getSingleProperty,
  updateProperty,
  deleteProperty,
};
