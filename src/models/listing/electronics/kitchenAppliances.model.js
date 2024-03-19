import mongoose from "mongoose";

const kitchenApplianceSchema = new mongoose.Schema(
  {
    applianceName: {
      type: String,
      required: true,
    },
    brand: { type: String, required: true },
    images: [{ type: String, required: true }],
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
