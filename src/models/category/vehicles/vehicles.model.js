import mongoose from "mongoose";

const vehicleShema = new mongoose.Schema(
  {
    item: { type: mongoose.Schema.Types.Mixed, required: true },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Vehicles = mongoose.model("Vehicle", vehicleShema);
export default Vehicles;
