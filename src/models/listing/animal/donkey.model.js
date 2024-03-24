import mongoose from "mongoose";

const donkeySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    gender: {
      type: String,
      enum: ["male", "female", "kid"],
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    lactation: {
      type: Number,
    },
    hasDeliveredBaby: {
      type: Boolean,
    },
    hasFoal: {
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

const Donkey = mongoose.model("Donkey", donkeySchema);
export default Donkey;
