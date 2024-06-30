import mongoose from "mongoose";

const washingMachineSchema = new mongoose.Schema(
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
    brand: {
      type: String,
      required: true,
    },
    machineType: {
      type: String,
      required: true,
      enu: ["Top Load", "Front Load"],
    },
    capacity: {
      type: Number,
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

const WashingMachine = mongoose.model("WashingMachine", washingMachineSchema);
export default WashingMachine;
