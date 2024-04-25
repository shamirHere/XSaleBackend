import { ComputerLaptop } from "../../../models/listing/electronics/index.js";
import { AsyncHandler, ApiResponse } from "../../../utils/index.js";
import Item from "../../../models/listing/items/items.models.js";

const createComputerLaptop = AsyncHandler(async (req, res) => {
  const {
    user,
    productType,
    type,
    brand,
    ram,
    ssd_hdd,
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
    } else if (!ram) {
      return res
        .status(400)
        .json(new ApiResponse(400, ram, "ram information is required"));
    } else if (!ssd_hdd) {
      return res
        .status(400)
        .json(new ApiResponse(400, ssd_hdd, "ssd_hdd information is required"));
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
            "location of the computer / laptop is required"
          )
        );
    } else if (!askingPrice) {
      return res
        .status(400)
        .json(new ApiResponse(400, askingPrice, "asking price is required"));
    } else {
      const newComputer_laptop = new ComputerLaptop(req.body);
      const savedComputer_laptop = await newComputer_laptop.save();
      const computerLaptop_location_user = await ComputerLaptop.find(
        savedComputer_laptop._id
      ).populate({ path: "user", populate: { path: "location" } });
      const item = new Item({
        item: computerLaptop_location_user,
        location: computerLaptop_location_user[0].location,
      });
      const savedInItems = await item.save();
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            computerLaptop_location_user,
            "computer / laptop listing created successfully"
          )
        );
    }
  } catch (error) {
    console.log(`error while creating a new computer / laptop ${error}`);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while creating the new computer / laptop"
        )
      );
  }
});
const getAllComputerLaptop = AsyncHandler(async (req, res) => {
  try {
    const computer_laptop = await ComputerLaptop.find().populate({
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
          computer_laptop,
          "these are all the computer laptop"
        )
      );
  } catch (error) {
    console.log("error while fetching all the compter laptop", error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "error while fetching all the compter laptop "
        )
      );
  }
});

const getSingleComputerLaptop = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const computer_laptop = await ComputerLaptop.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!computer_laptop) {
      return res
        .status(404)
        .json(
          new ApiResponse(
            404,
            computer_laptop,
            "the computer / laptop does not exist"
          )
        );
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          computer_laptop,
          "computer / laptop fetched successfully"
        )
      );
  } catch (error) {
    console.log("error while fetching single computer / laptop ", error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "error while fething single computer / laptop "
        )
      );
  }
});

const updateComputerLaptop = AsyncHandler(async (req, res) => {
  const {
    _id,
    type,
    brand,
    ram,
    ssd_hdd,
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
    const updatedComputerLaptop = await ComputerLaptop.findByIdAndUpdate(
      _id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedComputerLaptop) {
      return res
        .status(404)
        .json(
          new ApiResponse(
            404,
            updatedComputerLaptop,
            "computer / laptop not found"
          )
        );
    } else if (updatedComputerLaptop) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedComputerLaptop,
            "your listing for this computer / laptop updated"
          )
        );
    }
  } catch (error) {
    console.log("error while updating the compter / laptop", error);
    return res
      .status(500)
      .json(
        new ApiResponse(500, "", "erorr while updating the computer / laptop")
      );
  }
});

const deleteComputerLaptop = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedComputerLaptop = await ComputerLaptop.findByIdAndDelete(_id);
    if (!deletedComputerLaptop) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "computer / laptop does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "computer / laptop deleted successfully"));
  } catch (error) {
    console.log("error while deleting the computer / laptop", error);
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while computer / laptop "
        )
      );
  }
});
export {
  createComputerLaptop,
  getAllComputerLaptop,
  getSingleComputerLaptop,
  updateComputerLaptop,
  deleteComputerLaptop,
};
