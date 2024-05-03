import { ApiError, ApiResponse, AsyncHandler } from "../../../utils/index.js";

const getAllSubItem = AsyncHandler(async (req, res) => {
  const { category, subItem } = req.params;
  try {
    console.log(req.params);
  } catch (error) {
    console.log(`error while fetching sub item ${error}`);
    res
      .status(500)
      .json(new ApiResponse(500, error, "error while fetching sub item"));
  }
});
export { getAllSubItem };
