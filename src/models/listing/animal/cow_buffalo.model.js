import mongoose from "mongoose";

const cow_buffalo_schema = new mongoose.Schema(
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
    currentCapacity: {
      type: Number,
    },
    maximumCapacity: {
      type: Number,
      required: true,
    },
    hasDeliverdBaby: {
      type: Boolean,
      default: false,
    },
    whenDelivered: {
      type: Date,
      default: null,
    },
    hasCalf: {
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

const CowBuffalo = mongoose.model("cowBuffalo", cow_buffalo_schema);
export default CowBuffalo;
