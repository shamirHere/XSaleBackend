import { AsyncHandler, ApiResponse } from "../../../utils/index.js";
import { SparePart } from "../../../models/listing/bike/index.js";

const createSparePart = AsyncHandler(async (req, res) => {
  const {
    user,
    sparePartName,
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
    } else if (!sparePartName) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, sparePartName, "spare part name is required")
        );
    } else if (!additionalFeature) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            additionalFeature,
            "additional feature is required"
          )
        );
    } else if (media.lenth === 0) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            media,
            "additional one image or video is required"
          )
        );
    } else if (!location) {
      return res
        .status(400)
        .json(new ApiResponse(400, location, "location is required"));
    } else if (!askingPrice) {
      return res
        .status(400)
        .json(new ApiResponse(400, askingPrice, "askingPrice is required"));
    } else {
      const newSparePart = new SparePart(req.body);
      const savedSparePart = await newSparePart.save();
      const sparePart_location_user = await SparePart.find(
        savedSparePart._id
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
            sparePart_location_user,
            "new spare part created successfully"
          )
        );
    }
  } catch (error) {}
});
const getAllSpareParts = AsyncHandler(async (req, res) => {
  try {
    const spareParts = await SparePart.find().populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(new ApiResponse(200, spareParts, "these are all the spare parts"));
  } catch (error) {
    console.log("error while fetching all the spare parts ", error);
    return res
      .status(500)
      .json(
        new ApiResponse(500, error, "error while fetching all the spare parts")
      );
  }
});
const getSingleSpartPart = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "please provide the id of the dog"));
    }
    const sparePart = await SparePart.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!sparePart) {
      return res
        .status(404)
        .json(new ApiResponse(404, sparePart, "the spare part does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, sparePart, "spare part fetched successfully"));
  } catch (error) {
    console.log("error while fetching single spare part ", error);
    return res
      .status(500)
      .json(
        new ApiResponse(500, error, "error while fething single spare part")
      );
  }
});
const updateSparePart = AsyncHandler(async (req, res) => {
  const {
    _id,
    sparePartName,
    additionalFeature,
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
    const updatedSparePart = await SparePart.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedSparePart) {
      return res
        .status(404)
        .json(
          new ApiResponse(404, updatedSparePart, "updated spare part not found")
        );
    } else if (updatedSparePart) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedSparePart,
            "your listing for this SparePart updated"
          )
        );
    }
  } catch (error) {
    console.log("error while updating the spare part  ", error);
    return res
      .status(500)
      .json(new ApiResponse(500, "", "erorr while updating the spare part"));
  }
});
const deleteSparePart = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedSparePart = await SparePart.findByIdAndDelete(_id);
    if (!deletedSparePart) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "spare part does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "spare part deleted successfully"));
  } catch (error) {
    console.log("error while deleting the spare part ", error);
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while deleting spare part"
        )
      );
  }
});

export {
  createSparePart,
  getAllSpareParts,
  getSingleSpartPart,
  updateSparePart,
  deleteSparePart,
};
