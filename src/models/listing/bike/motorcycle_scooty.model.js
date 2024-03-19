import mongoose from "mongoose";

const motorCycle_scootySchema = new mongoose.Schema(
  {
    itemName: {
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
    registerationYear: {
      type: Number,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
      enum: ["petrol", "electric"],
    },
    kmDriven: {
      type: String,
      required: true,
    },
    numberOfOwner: {
      type: Number,
      required: true,
    },
    additionalInformation: {
      type: String,
    },
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
const MotorcycleScooty = mongoose.model(
  "MotorcycleScooty",
  motorCycle_scootySchema
);
export default MotorcycleScooty;
