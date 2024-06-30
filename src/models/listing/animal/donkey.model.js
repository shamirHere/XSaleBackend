import mongoose from "mongoose";

const donkeySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productType: {
      type: String,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Kid"],
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    hasDeliveredBaby: {
      type: String,
    },
    hasFoal: {
      type: String,
    },
    isPregnant: {
      type: String,
    },
    additionalInformation: { type: String },
    media: [{ type: String, required: true }],
    location: {
      type: String,
      required: true,
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
