import mongoose from "mongoose";

const donkeySchema = new mongoose.Schema(
  {
    gender: {
      type: String,
      enum: ["male", "female", "kid"],
      required: true,
    },
    ageInYears: {
      type: Number,
      required: true,
    },
    lactation: {
      type: Number,
    },
    hasDeliveredBaby: {
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

const Donkey = mongoose.model("Donkey", donkeySchema);
export default Donkey;
