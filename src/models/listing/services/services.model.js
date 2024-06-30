import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    productType: {
      type: String,
      required: [true, "product type is required"],
    },
    type: {
      type: String,
      required: true,
    },
    adTitle: {
      type: String,
      required: true,
    },
    additionalInformation: {
      type: String,
      required: true,
    },
    media: [{ type: String, required: true }],
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Services = mongoose.model("Service", serviceSchema);
export default Services;
