import mongoose from "mongoose";

const phoneSchema = new mongoose.Schema(
  {
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
    images: [{ type: String, required: true }],
    location: {
      type: mongoose.Schema.Type.ObjectId,
      ref: "Location",
    },
  },
  { timestamps: true }
);

const Phone = mongoose.model("Phone", phoneSchema);
export default Phone;
