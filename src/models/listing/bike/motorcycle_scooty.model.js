import mongoose from "mongoose";

const motorCycle_scootySchema = new mongoose.Schema(
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
      enum: ["motorcycle", "scooty"],
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    registrationYear: {
      type: Number,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
      enum: ["Petrol", "Electric"],
    },
    kmDriven: {
      type: Number,
      required: true,
    },
    numberOfOwner: {
      type: Number,
      required: true,
    },
    additionalInformation: {
      type: String,
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
const Bike_Scooty = mongoose.model("BikeScooty", motorCycle_scootySchema);
export default Bike_Scooty;
