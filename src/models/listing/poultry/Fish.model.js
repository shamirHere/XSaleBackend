import mongoose from "mongoose";

const fishModel = new mongoose.Schema(
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
    type: {
      type: String,
      required: true,
      enum: ["Fish", "Seed"],
    },
    breed: {
      type: String,
    },
    hasFishPound: {
      type: Boolean,
    },
    additionalInformation: {
      type: String,
    },
    quantityAvailable: {
      type: Number,
      required: true,
    },
    quantityType: {
      type: String,
      required: true,
      enum: ["Per Piece", "Per Kg"],
    },
    media: [{ type: String, required: true }],
    location: {
      type: String,
      required: true,
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
