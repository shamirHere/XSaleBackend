import { AsyncHandler, ApiResponse } from "../../../utils/index.js";
import Item from "../../../models/listing/items/items.models.js";
import { Services } from "../../../models/listing/services/index.js";

const createService = AsyncHandler(async (req, res) => {
  const {
    user,
    categoryName,
    productType,
    type,
    adTitle,
    additionalInformation,
    media,
    location,
  } = req.body;
  try {
    if (!user) {
      return res
        .status(400)
        .json(new ApiResponse(400, user, "user id is required"));
    } else if (!categoryName) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, categoryName, "category name type is required")
        );
    } else if (!productType) {
      return res
        .status(400)
        .json(new ApiResponse(400, productType, "product type is required"));
    } else if (!type) {
      return res
        .status(400)
        .json(new ApiResponse(400, type, "type of service is required"));
    } else if (!adTitle) {
      return res
        .status(400)
        .json(new ApiResponse(400, adTitle, "title of the ad is required"));
    } else if (!additionalInformation) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            additionalInformation,
            "additional information of the ad is required"
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
          new ApiResponse(400, location, "location of the service is required")
        );
    } else {
      const newService = new Services(req.body);
      const savedService = await newService.save();
      const service_location_user = await Services.find(
        savedService._id
      ).populate({
        path: "user",
      });
      const item = new Item({
        item: service_location_user,
        location: service_location_user[0].location,
      });
      const savedInItems = await item.save();
      const saveInCategory = new Item({
        item: service_location_user,
        location: service_location_user[0].location,
      });
      const savedInCategory = await saveInCategory.save();
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            service_location_user,
            "new service created successfully"
          )
        );
    }
  } catch (error) {
    console.log(`error while creating new service ${error}`);
    return res
      .status(400)
      .json(new ApiResponse(400, error, "error while creating new service"));
  }
});
const getAllServices = AsyncHandler(async (req, res) => {
  try {
    const services = await Services.find().populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(new ApiResponse(200, services, "these are all the services"));
  } catch (error) {
    console.log("error while fetching all the services", error);
    return res
      .status(500)
      .json(
        new ApiResponse(500, error, "error while fetching all the services")
      );
  }
});
const getSingleService = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the service")
        );
    }
    const service = await Services.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!service) {
      return res
        .status(404)
        .json(new ApiResponse(404, service, "the service does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, service, "service fetched successfully"));
  } catch (error) {
    console.log("error while fetching single service", error);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fething single service"));
  }
});
const updateService = AsyncHandler(async (req, res) => {
  const {
    _id,
    productType,
    breed,
    gender,
    age,
    vaccination,
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
    const updatedService = await Services.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedService) {
      return res
        .status(404)
        .json(new ApiResponse(404, updatedService, "service not found"));
    } else if (updatedService) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedService,
            "your listing for this service updated"
          )
        );
    }
  } catch (error) {
    console.log("error while updating the service", error);
    return res
      .status(500)
      .json(new ApiResponse(500, "", "erorr while updating the service"));
  }
});
const deleteService = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedService = await Services.findByIdAndDelete(_id);
    if (!deletedService) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "service does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "service deleted successfully"));
  } catch (error) {
    console.log("error while deleting the service", error);
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while deleting service"
        )
      );
  }
});

export {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};
