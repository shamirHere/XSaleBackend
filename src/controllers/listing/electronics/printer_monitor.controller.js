import { AsyncHandler, ApiResponse } from "../../../utils/index.js";
import { PrinterMonitor } from "../../../models/listing/electronics/index.js";
import Item from "../../../models/listing/items/items.models.js";
import { Electronics } from "../../../models/category/index.js";

const createPrinterMonitor = AsyncHandler(async (req, res) => {
  const {
    user,
    productType,
    type,
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
            "location of the printer/monitor is required"
          )
        );
    } else if (!askingPrice) {
      return res
        .status(400)
        .json(new ApiResponse(400, askingPrice, "asking price is required"));
    } else {
      const newPrinter_monitor = new PrinterMonitor(req.body);
      const savedPrinterMonitor = await newPrinter_monitor.save();
      const printerMonitor_location_user = await PrinterMonitor.find(
        savedPrinterMonitor._id
      ).populate({ path: "user", populate: { path: "location" } });
      const item = new Item({
        item: printerMonitor_location_user,
        location: printerMonitor_location_user[0].location,
      });
      const savedInItems = await item.save();
      const saveInCategory = new Electronics({
        item: printerMonitor_location_user,
        location: printerMonitor_location_user[0].location,
      });
      const savedInCategory = await saveInCategory.save();
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            printerMonitor_location_user,
            "printer / monitor listing created successfully"
          )
        );
    }
  } catch (error) {
    console.log(`error while creating a new printer monitor ${error}`);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while creating the new printer/monitor"
        )
      );
  }
});
const getAllPrinterMonitor = AsyncHandler(async (req, res) => {
  try {
    const printers_monitors = await PrinterMonitor.find().populate({
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
          printers_monitors,
          "these are all the printer monitor"
        )
      );
  } catch (error) {
    console.log("error while fetching all the printer monitor ", error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "error while fetching all the printer monitor"
        )
      );
  }
});
const getSinglePrinterMonitor = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const printer_monitor = await PrinterMonitor.findOne({ _id }).populate({
      path: "user",
      populate: { path: "location" },
    });
    if (!printer_monitor) {
      return res
        .status(404)
        .json(
          new ApiResponse(
            404,
            printer_monitor,
            "the printer / monitor does not exist"
          )
        );
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          printer_monitor,
          "printer / monitor fetched successfully"
        )
      );
  } catch (error) {
    console.log("error while fetching single printer / monitor", error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "error while fething single printer / monitor"
        )
      );
  }
});
const updatePrinterMonitor = AsyncHandler(async (req, res) => {
  const { _id, type, additionalInformation, media, location, askingPrice } =
    req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "_id the of the document is required"));
    }
    const updatedPrinterMonitor = await PrinterMonitor.findByIdAndUpdate(
      _id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedPrinterMonitor) {
      return res
        .status(404)
        .json(
          new ApiResponse(
            404,
            updatedPrinterMonitor,
            "printer / monitor not found"
          )
        );
    } else if (updatedPrinterMonitor) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedPrinterMonitor,
            "your listing for this printer / monitor updated"
          )
        );
    }
  } catch (error) {
    console.log("error while updating the printer / monitor", error);
    return res
      .status(500)
      .json(
        new ApiResponse(500, "", "erorr while updating the printer / monitor")
      );
  }
});
const deletePrinterMonitor = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedPrinterMonitor = await PrinterMonitor.findByIdAndDelete(_id);
    if (!deletedPrinterMonitor) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "printer / monitor does not exist"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", "printer / monitor deleted successfully"));
  } catch (error) {
    console.log("error while deleting the printer / monitor ", error);
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while printer / monitor"
        )
      );
  }
});

export {
  createPrinterMonitor,
  getAllPrinterMonitor,
  getSinglePrinterMonitor,
  updatePrinterMonitor,
  deletePrinterMonitor,
};
