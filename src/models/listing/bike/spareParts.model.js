import mongoose from "mongoose";

const sparePartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productType: {
      type: String,
      required: [true, "product type is required"],
    },
    sparePartName: {
      type: String,
      required: true,
    },
    additionalInformation: {
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
