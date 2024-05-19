import mongoose from "mongoose";

const carRentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productType: {
      type: String,
      required: [true, "product type is required"],
    },
    vehicleType: {
      type: String,
      enum: ["SUV", "Sedan", "Hatchback"],
    },
    vehicleModel: {
      type: String,
    },
    availibility: {
      type: String,
      enum: ["24 hours", "only in night", "only in day"],
    },

    // options only for bus
    seatsInBus: {
      type: Number,
      required: true,
    },
    isBusAc: {
      type: Boolean,
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
    fareKm: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const CarRent = mongoose.model("CarRent", carRentSchema);
export default CarRent;
