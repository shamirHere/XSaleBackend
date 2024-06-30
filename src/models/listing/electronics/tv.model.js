import mongoose from "mongoose";

const tvSchema = new mongoose.Schema(
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
    brand: {
      type: String,
      required: true,
    },
    model: {
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
    location: {
      type: String,
      required: true,
    },
    media: [{ type: String, required: true }],
    askingPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const Tv = mongoose.model("Tv", tvSchema);
export default Tv;
