import mongoose from "mongoose";

const computerAccessories = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productType: {
      type: String,
      required: [true, "product type is required"],
    },
    type: {
      type: String,
      required: true,
      enum: ["printer", "monitor"],
    },
    additionalInformation: {
      type: String,
    },
    media: [{ type: String, required: true }],
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
    askingPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const ComputerAccessories = mongoose.model(
  "ComputerAccessories",
  computerAccessories
);
export default ComputerAccessories;
