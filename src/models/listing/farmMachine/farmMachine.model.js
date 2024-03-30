import mongoose from "mongoose";

const farmMachineSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    machineName: {
      type: String,
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
    aksingPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const FarmMachine = mongoose.model("FarmMachine", farmMachineSchema);
export default FarmMachine;
