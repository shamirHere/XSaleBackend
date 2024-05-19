import mongoose from "mongoose";

const bicycleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productType: {
      type: String,
      required: [true, "product type is required"],
    },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    isElectric: { type: Boolean, requried: true },
    oldInMonths: {
      type: String,
      requried: true,
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

const Bicycle = mongoose.model("Bicycle", bicycleSchema);
export default Bicycle;
