import mongoose from "mongoose";

const tabletSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
      requried: true,
    },
    additonalInformation: {
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

const Tablet = mongoose.model("Tablet", tabletSchema);
export default Tablet;
