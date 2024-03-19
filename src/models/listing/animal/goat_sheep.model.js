import mongoose from "mongoose";

const goat_sheep_schema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      enum: ["cow", "buffalo"],
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    ageInMonth: {
      type: Number,
      required: true,
    },
    lactation: {
      type: Number,
    },
    currentMilkCapacityPerDay: {
      type: Number,
    },
    totalMilkCapacityPerDay: {
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
    images: [{ type: String, required: true }],
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
