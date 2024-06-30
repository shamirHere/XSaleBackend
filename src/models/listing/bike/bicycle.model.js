import mongoose from "mongoose";

const bicycleSchema = new mongoose.Schema(
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
    brand: { type: String, required: true },
    model: { type: String, required: true },
    isElectric: { type: String, enum: ["yes", "no"], required: true },
    oldInMonths: {
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

const Bicycle = mongoose.model("Bicycle", bicycleSchema);
export default Bicycle;
