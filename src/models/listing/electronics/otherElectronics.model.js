import mongoose from "mongoose";

const otherElectronicsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    categoryName: {
      type: String,
      required: true,
    },
    productType: {
      type: String,
      required: [true, "product type is required"],
    },
    name: {
      type: String,
      required: true,
    },
    additionalInformation: {
      type: String,
      required: true,
    },
    media: [{ type: String, required: true }],
    location: {
      type: String,
      required: true,
    },
    askingPrice: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const OtherElectronics = mongoose.model(
  "otherElectronic",
  otherElectronicsSchema
);
export default OtherElectronics;
