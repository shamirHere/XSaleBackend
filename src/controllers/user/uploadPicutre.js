import { AsyncHandler, ApiResponse } from "../../utils/index.js";
import { uploaderOnCloudinary } from "../../utils/fileUpload.js";

const uploadPicture = AsyncHandler(async (req, res) => {
  const { image } = req.body; // Assuming 'image' field contains the base64 string
  // Validate the presence of the image data

  console.log(req.body, "this is body");

  if (!image) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Image data is required"));
  }

  try {
    // Decode the base64-encoded image data
    // const buffer = Buffer.from(image, "base64");

    // console.log(buffer, "this is buffer");

    // Handle successful upload
    return res
      .status(201)
      .json(
        new ApiResponse(201, uploadedImage[0], "Image uploaded successfully")
      );
  } catch (error) {
    console.error(`Error uploading image: ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal error while uploading image"));
  }
});

export default uploadPicture;
