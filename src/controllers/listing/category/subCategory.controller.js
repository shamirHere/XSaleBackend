import { ApiError, ApiResponse, AsyncHandler } from "../../../utils/index.js";

const getSubCategory = AsyncHandler(async (req, res) => {
  const subCategory = req.params.subcategory;

  try {
    return res
      .status(200)
      .json(new ApiResponse(200, subCategory, "data fetch successfull"));
  } catch (error) {
    console.log(`error while fetching the sub categories &{error}`);
    return res
      .status(500)
      .json(
        new ApiResponse(500, error, "error while fetching the sub category")
      );
  }
});

export { getSubCategory };
