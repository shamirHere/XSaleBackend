import mongoose from "mongoose";

const tvSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
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
    },
    media: [{ type: String, requried: true }],
    askingPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const Tv = mongoose.model("Tv", tvSchema);
export default Tv;
