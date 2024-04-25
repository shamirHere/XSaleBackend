import mongoose from "mongoose";

const chickenModel = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productType: {
      type: String,
      required: [true, "product type is required"],
    },

    breed: {
      type: String,
      required: true,
      enum: ["Chicken", "Duck", "Turkey", "Quails (Bater)", "Swan", "Other"],
    },
    type: {
      type: String,
      required: true,
      enum: ["Birds", "Chicks", "Eggs"],
    },
    hasPoultryFarm: {
      type: Boolean,
    },
    sellerType: {
      type: String,
    },
    quantityType: {
      type: String,
      required: true,
      enum: ["Per Piece", "Per Kg"],
    },
    additionalInformation: {
      type: String,
      required: true,
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

const Chicken = mongoose.model("Chicken", chickenModel);
export default Chicken;
