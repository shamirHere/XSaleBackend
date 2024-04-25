import mongoose from "mongoose";

const goat_sheep_schema = new mongoose.Schema(
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
      enum: ["goat", "sheep"],
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
    lactation: {
      type: Number,
    },
    currentCapacity: {
      type: Number,
    },
    maximumCapacity: {
      type: Number,
    },
    hasDeliverdBaby: {
      type: Boolean,
    },
    hasKid: {
      type: Boolean,
    },
    isPregnant: {
      type: Boolean,
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
