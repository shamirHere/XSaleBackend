import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productType: {
      type: String,
      required: [true, "product type is required"],
    },
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      requried: true,
    },
    adTitle: {
      type: String,
      required: true,
    },
    additionalInformation: {
      type: String,
      requried: true,
    },
    media: [{ type: String, required: true }],
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
    askingPrice: {
      type: Number,
      requried: true,
    },
  },
  { timestamps: true }
);

const Services = mongoose.model("Service", serviceSchema);
export default Services;
