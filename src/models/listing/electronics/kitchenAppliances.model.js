import mongoose from "mongoose";

const kitchenApplianceSchema = new mongoose.Schema(
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
    applianceName: {
      type: String,
      required: true,
    },
    brand: { type: String, required: true },
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

const KitchenAppliance = mongoose.model(
  "KitchenAppliance",
  kitchenApplianceSchema
);
export default KitchenAppliance;
