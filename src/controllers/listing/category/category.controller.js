import { ApiError, ApiResponse, AsyncHandler } from "../../../utils/index.js";

const getCategory = AsyncHandler(async (req, res) => {
  const category = req.params.category;
  try {
    return res
      .status(200)
      .json(new ApiResponse(200, category, "data fetch successfull"));
  } catch (error) {
    console.log("error while fetching the category ", error);
    return res
      .status(500)
      .json(new ApiResponse(500, error, "error while fetching the category "));
  }
});

export { getCategory };
