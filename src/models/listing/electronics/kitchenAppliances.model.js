import mongoose from "mongoose";

const kitchenApplianceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    applianceName: {
      type: String,
      required: true,
    },
    brand: { type: String, required: true },
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

const KitchenAppliance = mongoose.model(
  "KitchenAppliance",
  kitchenApplianceSchema
);
export default KitchenAppliance;
