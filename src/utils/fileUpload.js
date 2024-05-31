import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const uploaderOnCloudinary = async (files) => {
  try {
    const uploadedFiles = [];
    let result;
    for (const file of files) {
      result = await cloudinary.uploader.upload(file.path, {
        resource_type: "auto",
      });
      uploadedFiles.push(result);
    }
    console.log("this is file path of the cloudinary", result.url);
    return uploadedFiles;
  } catch (error) {
    fs.unlinkSync(files);
    console.log(`error while uploading files on cloudinary, ${error}`);
  }
};
cloudinary.config({
  cloud_name: "xsale",
  api_key: "327239387544486",
  api_secret: "McUGuY661Mhl09uXiqA3vMa2Efc",
});

export { uploaderOnCloudinary };
