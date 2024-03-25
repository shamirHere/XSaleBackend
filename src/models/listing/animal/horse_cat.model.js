import mongoose from "mongoose";

const horse_cat_schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: ["horse", "cat"],
      required: [true, "type of the animal is required horse or cat"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
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
    deliveredBaby: {
      type: Boolean,
      default: false,
    },
    hasKid: {
      type: Boolean,
      default: false,
    },
    isPregnant: {
      type: Boolean,
      default: false,
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
