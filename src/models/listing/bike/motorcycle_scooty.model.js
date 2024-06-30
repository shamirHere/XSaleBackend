import mongoose from "mongoose";

const motorCycle_scootySchema = new mongoose.Schema(
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
    type: {
      type: String,
      required: true,
      enum: ["Bike", "Scooty"],
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    registerationDate: {
      type: String,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
      enum: ["Petrol", "Electric"],
    },
    kmDriven: {
      type: String,
      required: true,
    },
    numberOfOwner: {
      type: String,
      required: true,
    },
    additionalInformation: {
      type: String,
    },
    media: [{ type: String, required: true }],
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
const Bike_Scooty = mongoose.model("BikeScooty", motorCycle_scootySchema);
export default Bike_Scooty;
