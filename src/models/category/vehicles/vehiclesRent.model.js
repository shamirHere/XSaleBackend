import mongoose from "mongoose";

const vehicleRentShema = new mongoose.Schema(
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

const VehiclesRent = mongoose.model("VehicleRent", vehicleRentShema);
export default VehiclesRent;
