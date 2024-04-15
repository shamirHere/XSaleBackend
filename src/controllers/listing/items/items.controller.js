import { AsyncHandler, ApiResponse } from "../../../utils/index.js";
import Item from "../../../models/listing/items/items.models.js";

const getAllItems = AsyncHandler(async (req, res) => {
  try {
    const items = await Item.find();
    return res
      .status(200)
      .json(new ApiResponse(200, items, "All items  fetched successfully"));
  } catch (error) {
    console.log("error while fetching all the items", error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while fetching all the data"
        )
      );
  }
});

export { getAllItems };
