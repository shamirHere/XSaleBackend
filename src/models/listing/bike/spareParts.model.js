import mongoose from "mongoose";

const sparePartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sparePartName: {
      type: String,
      required: true,
    },
    additionalFeature: {
      type: String,
      required: true,
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

const SparePart = mongoose.model("SparePart", sparePartSchema);
export default SparePart;
