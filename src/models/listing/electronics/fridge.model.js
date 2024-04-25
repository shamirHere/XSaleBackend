import mongoose from "mongoose";

const fridgeSchema = new mongoose.Schema(
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
    capacity: {
      type: Number,
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

const Fridge = mongoose.model("Fride", fridgeSchema);
export default Fridge;
