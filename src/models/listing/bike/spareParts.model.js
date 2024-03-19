import mongoose from "mongoose";

const sparePartsSchema = new mongoose.Schema(
  {
    sparePartName: {
      type: String,
      required: true,
    },
    additionalInformation: {
      type: String,
      required: true,
    },
    image: [{ type: String, required: true }],
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

const SparePart = mongoose.model("SparePart", sparePartsSchema);
export default SparePart;
