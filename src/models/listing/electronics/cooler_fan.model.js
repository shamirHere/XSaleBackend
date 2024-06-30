import mongoose from "mongoose";

const cooler_fanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    categoryName: {
      type: String,
      required: true,
    },
    productType: {
      type: String,
      required: [true, "product type is required"],
    },
    type: {
      type: String,
      required: true,
      enum: ["Cooler", "Stand Fan", "Ceiling Fan", "Wall Fan", "Exhaust Fan"],
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

const CoolerFan = mongoose.model("CoolerFan", cooler_fanSchema);
export default CoolerFan;
