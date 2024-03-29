import mongoose from "mongoose";

const washingMachineSchema = new mongoose.Schema(
  {
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
      required: true,
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

const WashingMachine = mongoose.model("WashingMachine", washingMachineSchema);
export default WashingMachine;
