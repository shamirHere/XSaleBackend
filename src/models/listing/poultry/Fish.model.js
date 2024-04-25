import mongoose from "mongoose";

const fishModel = new mongoose.Schema(
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
    },
    breed: {
      type: String,
    },
    hasFishPound: {
      type: Boolean,
    },
    sellerType: {
      type: String,
    },
    additionalInformation: {
      type: String,
      required: true,
    },
    quantityType: {
      type: String,
      required: true,
      enum: ["Per Piece", "Per Kg"],
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

const Fish = mongoose.model("Fish", fishModel);
export default Fish;
