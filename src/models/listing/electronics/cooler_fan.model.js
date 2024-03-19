import mongoose from "mongoose";

const cooler_fanSchema = new mongoose.Schema(
  {
    item: {
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
      required: true,
    },
    images: [{ type: String, required: true }],
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
    askinPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const CoolerFan = mongoose.model("CoolerFan", cooler_fanSchema);
export default CoolerFan;
