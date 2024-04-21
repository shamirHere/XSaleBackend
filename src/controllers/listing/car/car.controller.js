import { ApiError, AsyncHandler } from "../../../utils/index.js";
import { Car } from "../../../models/listing/car/index.js";
import Item from "../../../models/listing/items/items.models.js";

const createCar = AsyncHandler(async (req, res) => {
  const {
    user,
    productType,
    type,
    brand,
    model,
    registerationYear,
    fuelType,
    transmission,
    kmDriven,
    numberOfOwner,
    additionalFeature,
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
        .json(new ApiResponse(400, type, "type is required"));
    } else if (!brand) {
      return res
        .status(400)
        .json(new ApiResponse(400, brand, "brand is required"));
    } else if (!model) {
      return res
        .status(400)
        .json(new ApiResponse(400, model, "model is required"));
    } else if (!registerationYear) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            registerationYear,
            "registeration year is required"
          )
        );
    } else if (!fuelType) {
      return res
        .status(400)
        .json(new ApiResponse(400, fuelType, "fuel type is required"));
    } else if (!transmission) {
      return res
        .status(400)
        .json(new ApiResponse(400, transmission, "transmission is required"));
    } else if (!kmDriven) {
      return res
        .status(400)
        .json(new ApiResponse(400, kmDriven, "kmDriven is required"));
    } else if (!numberOfOwner) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, numberOfOwner, "number of Owner is required")
        );
    } else if (!additionalFeature) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, additionalFeature, "additional feature required")
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
          new ApiResponse(400, location, "location of the car is required")
        );
    } else if (!askingPrice) {
      return res
        .status(400)
        .json(new ApiResponse(400, askingPrice, "asking price is required"));
    } else {
      const newCar = new Car(req.body);
      const savedCar = await newCar.save();
      const car_location_user = await Car.find(savedCar._id).populate({
        path: "user",
        populate: {
          path: "location",
        },
      });
      const item = new Item({
        item: car_location_user,
        location: car_location_user[0].location,
      });
      const savedInItems = await item.save();
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            car_location_user,
            "new car created successfully"
          )
        );
    }
  } catch (error) {
    console.log(error, "erorr while creating the new car");
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "Internal server error while creating new car"
        )
      );
  }
});
const getAllCar = AsyncHandler(async (req, res) => {
  try {
    const cars = await Car.find().populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(new ApiResponse(200, cars, "these are all the cars cars"));
  } catch (error) {
    console.log("error while fetching all the cars ", error);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fetching all the cars"));
  }
});

const getSingleCar = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "please provide the id of the car"));
    }
    const car = await Car.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!car) {
      return res
        .status(404)
        .json(new ApiResponse(404, car, "the car does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, car, "car fetched successfully"));
  } catch (error) {
    console.log("error while fetching single car", error);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fething single car"));
  }
});
const updateCar = AsyncHandler(async (req, res) => {
  const {
    _id,
    type,
    brand,
    model,
    registerationYear,
    fuelType,
    transmission,
    kmDriven,
    numberOfOwner,
    additionalFeature,
    media,
    location,
    askingPrice,
  } = req.body;
  try {
    const updatedCar = await Car.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedCar) {
      return res
        .status(404)
        .json(new ApiResponse(404, updatedCar, "car not found"));
    } else if (updatedCar) {
      return res
        .status(200)
        .json(
          new ApiResponse(200, updatedCar, "your listing for this car updated")
        );
    }
  } catch (error) {
    console.log("error while updating the car", error);
    return res
      .status(500)
      .json(new ApiResponse(500, "", "erorr while updating the car"));
  }
});
const deleteCar = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedCar = await Car.findByIdAndDelete(_id);
    if (!deletedCar) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "car does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "car deleted successfully"));
  } catch (error) {
    console.log("error while deleting the car", error);
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while deleting the car"
        )
      );
  }
});

export { createCar, getAllCar, getSingleCar, updateCar, deleteCar };
