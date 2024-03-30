import mongoose from "mongoose";

const cooler_fanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      required: true,
      enum: ["cooler", "fan"],
    },
    brand: {
      type: String,
      required: true,
    },
    additionInformation: {
      type: String,
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

const CoolerFan = mongoose.model("CoolerFan", cooler_fanSchema);
export default CoolerFan;
