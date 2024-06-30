import mongoose from "mongoose";

const chickenModel = new mongoose.Schema(
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
      enum: ["Chicken", "Chicks", "Eggs"],
    },
    hasPoultryFarm: {
      type: Boolean,
    },
    quantity: {
      type: Number,
      required: true,
    },
    quantityType: {
      type: String,
      required: true,
      enum: ["Per Piece", "Per Kg"],
    },
    additionalInformation: {
      type: String,
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

const Chicken = mongoose.model("Chicken", chickenModel);
export default Chicken;
