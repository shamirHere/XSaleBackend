import mongoose from "mongoose";

const phoneSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    ram: {
      type: Number,
      required: true,
    },
    internalStorage: {
      type: Number,
      required: true,
    },
    oldInMonths: {
      type: Number,
      requried: true,
    },
    additionalInformation: {
      type: String,
    },
    media: [{ type: String, required: true }],
    location: {
      type: mongoose.Schema.Type.ObjectId,
      ref: "Location",
    },
    askingPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Phone = mongoose.model("Phone", phoneSchema);
export default Phone;
