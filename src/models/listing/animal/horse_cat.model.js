import mongoose from "mongoose";

const horse_cat_schema = new mongoose.Schema(
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
      enum: ["Horse", "Cat"],
      required: [true, "type of the animal is required horse or cat"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Kid"],
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
    deliveredBaby: {
      type: String,
    },
    hasKid: {
      type: String,
    },
    isPregnant: {
      type: String,
      required: true,
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

export const Horse_Cat = mongoose.model("HorseCat", horse_cat_schema);

export default Horse_Cat;
