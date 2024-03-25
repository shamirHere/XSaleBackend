import { ApiResponse, AsyncHandler } from "../../../utils/index.js";
import { Bike_Scooty } from "../../../models/listing/bike/index.js";

const createBikeScooty = AsyncHandler(async (req, res) => {
  const {
    user,
    type,
    brand,
    model,
    registrationYear,
    fuelType,
    kmDriven,
    numberOfOwner,
    additionalIformation,
    media,
    location,
    askingPrice,
  } = req.body;
  try {
    if (!user) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "user id is required"));
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
        .json(new ApiResponse(400, brand, "brand is required"));
    } else if (!fuelType) {
      return res
        .status(400)
        .json(new ApiResponse(400, fuelType, "fuel type is required"));
    } else if (!kmDriven) {
      return res
        .status(400)
        .json(new ApiResponse(400, kmDriven, "kmDriven is required"));
    } else if (!numberOfOwner) {
      return res
        .status(400)
        .json(new ApiResponse(400, numberOfOwner, "numberOfOwner is required"));
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
            "location of the bike scooty is required"
          )
        );
    } else if (!askingPrice) {
      return res
        .status(400)
        .json(new ApiResponse(400, askingPrice, "asking price is required"));
    } else {
      const newBikeScooty = new Bike_Scooty(req.body);
      const savedBikeScooty = await newBikeScooty.save();
      const bikeScooty_location_user = await Bike_Scooty.find(
        savedBikeScooty._id
      ).populate({
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
            bikeScooty_location_user,
            "new bike scooty created successfully"
          )
        );
    }
  } catch (error) {
    console.log(error, "erorr while creating the bike /scooty");
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "Internal server error while creating new bike / scooty"
        )
      );
  }
});

const getAllBikeScooty = AsyncHandler(async (req, res) => {
  try {
    const Bikes_Scooties = await Bike_Scooty.find().populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(
        new ApiResponse(200, Bikes_Scooties, "these are all the bike scooties")
      );
  } catch (error) {
    console.log("error while fetching all the bike scooties ", error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "error while fetching all the bike scooties"
        )
      );
  }
});

const getSingleBikeScooty = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the bike scooty")
        );
    }
    const bikeScooty = await Bike_Scooty.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!bikeScooty) {
      return res
        .status(404)
        .json(
          new ApiResponse(404, bikeScooty, "the bike /scooty does not exist")
        );
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, bikeScooty, "bike/scooty fetched successfully")
      );
  } catch (error) {
    console.log("error while fetching single bike scooty ", error);
    return res
      .status(500)
      .json(
        new ApiResponse(500, error, "error while fething single bike scooty")
      );
  }
});

const updateBikeScooty = AsyncHandler(async (req, res) => {
  const {
    _id,
    type,
    brand,
    model,
    registrationYear,
    fuelType,
    kmDriven,
    numberOfOwner,
    additionalIformation,
    media,
    location,
    askingPrice,
  } = req.body;
  try {
    const updatedBikeScooty = await Bike_Scooty.findByIdAndUpdate(
      _id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedBikeScooty) {
      return res
        .status(404)
        .json(new ApiResponse(404, updatedBikeScooty, "biek scooty not found"));
    } else if (updatedBikeScooty) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedBikeScooty,
            "your listing for this updatedBikeScooty updated"
          )
        );
    }
  } catch (error) {
    console.log("error while updating the bike scooty  ", error);
    return res
      .status(500)
      .json(new ApiResponse(500, "", "erorr while updating the bike scooty"));
  }
});

const deleteBikeScooty = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedBikeScooty = await Bike_Scooty.findByIdAndDelete(_id);
    if (!deletedBikeScooty) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "bike scooty does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "bike scooty deleted successfully"));
  } catch (error) {
    console.log("error while deleting the bike scooty ", error);
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while deleting buke scooty"
        )
      );
  }
});

export {
  createBikeScooty,
  getAllBikeScooty,
  getSingleBikeScooty,
  updateBikeScooty,
  deleteBikeScooty,
};
