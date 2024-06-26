import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
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
      enum: [
        "car",
        "ambulance",
        "truck",
        "tractor",
        "farmMachine",
        "jcb",
        "bus",
        "crain",
        "otherVehicle",
      ],
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
      type: String,
      required: true,
    },
    fuelType: {
      type: String,
      enum: ["diesel", "petrol", "cng", "lpg", "eletric"],
      required: true,
    },
    transmission: {
      type: String,
      required: true,
      enum: ["manual", "automatic"],
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
      required: true,
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
const Car = mongoose.model("Car", carSchema);
export default Car;
