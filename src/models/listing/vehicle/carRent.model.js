import mongoose from "mongoose";

const carRentSchema = new mongoose.Schema(
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
    vehicleType: {
      type: String,
      enum: ["SUV", "Sedan", "Hatchback"],
    },
    vehicleModel: {
      type: String,
    },
    availibility: {
      type: String,
      enum: ["24 Hours", "Only in Night", "Only in Day"],
    },

    // options only for bus
    seatsInBus: {
      type: Number,
    },
    isBusAc: {
      type: String,
    },
    media: [{ type: String, required: true }],
    location: {
      type: String,
      required: true,
    },
    additionalInformation: {
      type: String,
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
