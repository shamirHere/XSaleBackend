import mongoose from "mongoose";

const bullSchema = new mongoose.Schema(
  {
    breed: {
      type: String,
      requried: true,
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

const Bull = mongoose.model("Bull", bullSchema);
export default Bull;
