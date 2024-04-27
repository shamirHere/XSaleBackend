import mongoose from "mongoose";

const vehicleShema = new mongoose.Schema(
  {
    item: { type: mongoose.Schema.Types.Mixed, required: true },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
  },
  { timestamps: true }
);

const Vehicles = mongoose.model("Vehicle", vehicleShema);
export default Vehicles;
