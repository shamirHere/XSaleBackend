import mongoose from "mongoose";

const vehicleRentShema = new mongoose.Schema(
  {
    item: { type: mongoose.Schema.Types.Mixed, required: true },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const VehiclesRent = mongoose.model("VehicleRent", vehicleRentShema);
export default VehiclesRent;
