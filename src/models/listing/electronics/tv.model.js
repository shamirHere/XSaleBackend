import mongoose from "mongoose";

const tvSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    brandModel: {
      type: String,
      required: true,
    },
    screenSize: {
      type: Number,
      require: true,
    },
    additionalInformation: {
      type: String,
      required: true,
    },
    images: [{ type: String, requried: true }],
    askingPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const Tv = mongoose.model("Tv", tvSchema);
export default Tv;
