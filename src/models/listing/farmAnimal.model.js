import mongoose from "mongoose";

const farmAnimalSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["cow", "buffalo"],
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    lactation: {
      type: Number,
      rerquired: true,
    },
    currentMilkPerDay: {
      type: Number,
    },
    totalMilkCapacityPerDay: {
      type: Number,
      required: true,
    },
    hasDelliverdBaby: {
      type: Boolean,
      default: false,
    },
    whenDelivered: {
      type: String,
      required: true,
    },
    whenDeliveredBaby: {
      type: Date,
      default: null,
    },
    isCalf: {
      type: Boolean,
      default: false,
    },
    isPregnant: {
      type: Boolean,
      default: false,
    },
    monthsPregnant: {
      type: Number,
      default: false,
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

const FarmAnimal = mongoose.model("FarmAnimal", cowSchema);
export default FarmAnimal;
