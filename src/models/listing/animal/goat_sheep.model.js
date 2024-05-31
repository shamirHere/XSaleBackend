import mongoose from "mongoose";

const goat_sheep_schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productType: {
      type: String,
      enum: ["Goat", "Sheep"],
      required: [true, "product type is required"],
    },
    type: {
      type: String,
      enum: ["Goat", "Sheep"],
      required: [true, "type of the animal is required goat or sheep"],
    },
    gender: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    currentCapacity: {
      type: Number,
    },
    maximumCapacity: {
      type: Number,
    },
    hasDeliverdBaby: {
      type: String,
    },
    hasKid: {
      type: String,
    },
    isPregnant: {
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

export const Goat_Sheep = mongoose.model("GoatSheep", goat_sheep_schema);

export default Goat_Sheep;
