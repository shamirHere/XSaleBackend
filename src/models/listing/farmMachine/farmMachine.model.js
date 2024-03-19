import mongoose from "mongoose";

const farmMachineSchema = new mongoose.Schema(
  {
    machineName: {
      type: String,
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
    aksingPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const FarmMachine = mongoose.model("FarmMachine", farmMachineSchema);
export default FarmMachine;
