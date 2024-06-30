import mongoose from "mongoose";

const tabletSchema = new mongoose.Schema(
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
    oldInMonths: {
      type: Number,
      required: true,
    },
    additonalInformation: {
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

const Tablet = mongoose.model("Tablet", tabletSchema);
export default Tablet;
