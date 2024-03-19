import mongoose from "mongoose";

const camera_lenseSchema = new mongoose.Schema(
  {
    whatOffered: {
      type: String,
      enum: ["camera", "lenses"],
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
    additionalInformation: {
      type: String,
      required: true,
    },
    images: [{ type: String, required: true }],
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

const CameraLense = mongoose.model("CameraLense", camera_lenseSchema);
export default CameraLense;
