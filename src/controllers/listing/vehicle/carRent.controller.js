import { ApiResponse, AsyncHandler } from "../../../utils/index.js";
import { CarRent } from "../../../models/listing/vehicle/index.js";
import Item from "../../../models/listing/items/items.models.js";
import { VehiclesRent } from "../../../models/category/index.js";

const createCarRent = AsyncHandler(async (req, res) => {
  const { productType } = req.body;

  try {
    if (productType === "Car") {
      const {
        user,
        categoryName,
        productType,
        vehicleType,
        vehicleModel,
        availibility,
        fareKm,
        additionalInformation,
        media,
        location,
      } = req.body;
      if (!user) {
        return res
          .status(400)
          .json(new ApiResponse(400, user, "user id is required"));
      } else if (!categoryName) {
        return res
          .status(400)
          .json(
            new ApiResponse(400, categoryName, "category name is required")
          );
      } else if (!productType) {
        return res
          .status(400)
          .json(new ApiResponse(400, productType, "product type is required"));
      } else if (!vehicleType) {
        return res
          .status(400)
          .json(new ApiResponse(400, vehicleType, "vehicle type is required"));
      } else if (!vehicleModel) {
        return res
          .status(400)
          .json(
            new ApiResponse(400, vehicleModel, "vehicle model is required")
          );
      } else if (!availibility) {
        return res
          .status(400)
          .json(new ApiResponse(400, availibility, "availibity is required"));
      } else if (!fareKm) {
        return res
          .status(400)
          .json(new ApiResponse(400, fareKm, "fareKm type is required"));
      } else if (!media) {
        return res
          .status(400)
          .json(
            new ApiResponse(
              400,
              media,
              "atleast one image or video is required"
            )
          );
      } else if (!location) {
        return res
          .status(400)
          .json(
            new ApiResponse(
              400,
              location,
              "location of the CarRent is required"
            )
          );
      } else {
        const newCarRent = new CarRent(req.body);
        const savedCarRent = await newCarRent.save();
        const carRent_location_user = await CarRent.find(
          savedCarRent._id
        ).populate({
          path: "user",
        });
        const item = new Item({
          item: carRent_location_user,
          location: carRent_location_user[0].location,
        });
        const savedInItems = await item.save();
        const saveInCategory = new VehiclesRent({
          item: carRent_location_user[0],
          location: carRent_location_user[0].location,
        });
        const savedInCategory = await saveInCategory.save();
        return res
          .status(200)
          .json(
            new ApiResponse(
              200,
              carRent_location_user,
              "new CarRent created successfully"
            )
          );
      }
    } else if (productType === "Ambulance") {
      const {
        user,
        categoryName,
        productType,
        availibility,
        additionalInformation,
        fareKm,
        location,
        media,
      } = req.body;

      if (!user) {
        return res
          .status(400)
          .json(new ApiResponse(400, user, "user id is required"));
      } else if (!categoryName) {
        return res
          .status(400)
          .json(
            new ApiResponse(400, categoryName, "category name is required")
          );
      } else if (!productType) {
        return res
          .status(400)
          .json(new ApiResponse(400, productType, "product type is required"));
      } else if (!availibility) {
        return res
          .status(400)
          .json(new ApiResponse(400, availibility, "availibity is required"));
      } else if (!fareKm) {
        return res
          .status(400)
          .json(new ApiResponse(400, fareKm, "fareKm type is required"));
      } else if (!media) {
        return res
          .status(400)
          .json(
            new ApiResponse(
              400,
              media,
              "atleast one image or video is required"
            )
          );
      } else if (!location) {
        return res
          .status(400)
          .json(
            new ApiResponse(
              400,
              location,
              "location of the CarRent is required"
            )
          );
      } else {
        const newCarRent = new CarRent(req.body);
        const savedCarRent = await newCarRent.save();
        const carRent_location_user = await CarRent.find(
          savedCarRent._id
        ).populate({
          path: "user",
        });
        const item = new Item({
          item: carRent_location_user,
          location: carRent_location_user[0].location,
        });
        const savedInItems = await item.save();
        const saveInCategory = new VehiclesRent({
          item: carRent_location_user[0],
          location: carRent_location_user[0].location,
        });
        const savedInCategory = await saveInCategory.save();
        return res
          .status(200)
          .json(
            new ApiResponse(
              200,
              carRent_location_user,
              "new CarRent created successfully"
            )
          );
      }
    } else if (productType === "Bus") {
      const {
        user,
        categoryName,
        productType,
        vehicleModel,
        seatsInBus,
        isBusAc,
        media,
        location,
        additionalInformation,
        fareKm,
      } = req.body;

      if (!user) {
        return res
          .status(400)
          .json(new ApiResponse(400, user, "user id is required"));
      } else if (!categoryName) {
        return res
          .status(400)
          .json(
            new ApiResponse(400, categoryName, "category name is required")
          );
      } else if (!productType) {
        return res
          .status(400)
          .json(new ApiResponse(400, productType, "product type is required"));
      } else if (!vehicleModel) {
        return res
          .status(400)
          .json(
            new ApiResponse(400, vehicleModel, "vehicle model is required")
          );
      } else if (!seatsInBus) {
        return res
          .status(400)
          .json(new ApiResponse(400, seatsInBus, "seatsInBus is required"));
      } else if (!media) {
        return res
          .status(400)
          .json(
            new ApiResponse(
              400,
              media,
              "atleast one image or video is required"
            )
          );
      } else if (!location) {
        return res
          .status(400)
          .json(
            new ApiResponse(
              400,
              location,
              "location of the CarRent is required"
            )
          );
      } else if (!fareKm) {
        return res
          .status(400)
          .json(new ApiResponse(400, fareKm, "fareKm is required"));
      } else {
        const newCarRent = new CarRent(req.body);
        const savedCarRent = await newCarRent.save();
        const carRent_location_user = await CarRent.find(
          savedCarRent._id
        ).populate({
          path: "user",
        });
        const item = new Item({
          item: carRent_location_user,
          location: carRent_location_user[0].location,
        });
        const savedInItems = await item.save();
        const saveInCategory = new VehiclesRent({
          item: carRent_location_user[0],
          location: carRent_location_user[0].location,
        });
        const savedInCategory = await saveInCategory.save();
        return res
          .status(200)
          .json(
            new ApiResponse(
              200,
              carRent_location_user,
              "new CarRent created successfully"
            )
          );
      }
    } else {
      const {
        user,
        categoryName,
        productType,
        vehicleModel,
        additionalInformation,
        media,
        location,
        fareKm,
      } = req.body;
      if (!user) {
        return res
          .status(400)
          .json(new ApiResponse(400, user, "user id is required"));
      } else if (!categoryName) {
        return res
          .status(400)
          .json(
            new ApiResponse(400, categoryName, "category name is required")
          );
      } else if (!productType) {
        return res
          .status(400)
          .json(new ApiResponse(400, productType, "product type is required"));
      } else if (!vehicleModel) {
        return res
          .status(400)
          .json(new ApiResponse(400, vehicleModel, "vehicleModel is required"));
      } else if (!location) {
        return res
          .status(400)
          .json(new ApiResponse(400, location, "location is required"));
      } else if (!fareKm) {
        return res
          .status(400)
          .json(new ApiResponse(400, fareKm, "fareKm is required"));
      } else {
        const newCarRent = new CarRent(req.body);
        const savedCarRent = await newCarRent.save();
        const carRent_location_user = await CarRent.find(
          savedCarRent._id
        ).populate({
          path: "user",
        });
        const item = new Item({
          item: carRent_location_user,
          location: carRent_location_user[0].location,
        });
        const savedInItems = await item.save();
        const saveInCategory = new VehiclesRent({
          item: carRent_location_user[0],
          location: carRent_location_user[0].location,
        });
        const savedInCategory = await saveInCategory.save();
        return res
          .status(200)
          .json(
            new ApiResponse(
              200,
              carRent_location_user,
              "new CarRent created successfully"
            )
          );
      }
    }
  } catch (error) {
    console.log(error, "erorr while creating the new CarRent");
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "Internal server error while creating new CarRent"
        )
      );
  }
});
const getAllCarRent = AsyncHandler(async (req, res) => {
  try {
    const CarRents = await CarRent.find().populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(
        new ApiResponse(200, CarRents, "these are all the CarRents CarRents")
      );
  } catch (error) {
    console.log("error while fetching all the CarRents ", error);
    return res
      .status(500)
      .json(
        new ApiResponse(500, error, "error while fetching all the CarRents")
      );
  }
});

const getSingleCarRent = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the CarRent")
        );
    }
    const CarRent = await CarRent.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!CarRent) {
      return res
        .status(404)
        .json(new ApiResponse(404, CarRent, "the CarRent does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, CarRent, "CarRent fetched successfully"));
  } catch (error) {
    console.log("error while fetching single CarRent", error);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fething single CarRent"));
  }
});
const updateCarRent = AsyncHandler(async (req, res) => {
  const {
    _id,
    vehicleType,
    vehicleModel,
    availibility,
    fareKm,
    seatsInBus,
    isBusAc,
    media,
    location,
    askingPrice,
  } = req.body;
  try {
    const updatedCarRent = await CarRent.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedCarRent) {
      return res
        .status(404)
        .json(new ApiResponse(404, updatedCarRent, "CarRent not found"));
    } else if (updatedCarRent) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedCarRent,
            "your listing for this CarRent updated"
          )
        );
    }
  } catch (error) {
    console.log("error while updating the CarRent", error);
    return res
      .status(500)
      .json(new ApiResponse(500, "", "erorr while updating the CarRent"));
  }
});
const deleteCarRent = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedCarRent = await CarRent.findByIdAndDelete(_id);
    if (!deletedCarRent) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "CarRent does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "CarRent deleted successfully"));
  } catch (error) {
    console.log("error while deleting the CarRent", error);
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while deleting the CarRent"
        )
      );
  }
});

export {
  createCarRent,
  getAllCarRent,
  getSingleCarRent,
  updateCarRent,
  deleteCarRent,
};
