import mongoose from "mongoose";

const fridgeAcSchema = new mongoose.Schema(
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
    model: { type: String },
    acType: {
      type: String,
    },
    capacity: {
      type: Number,
      required: true,
    },
    media: [{ type: String, required: true }],
    additionalInformation: {
      type: String,
    },
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

const FridgeAc = mongoose.model("FridgeAc", fridgeAcSchema);
export default FridgeAc;
