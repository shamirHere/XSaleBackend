import mongoose from "mongoose";

const bikeSchema = new mongoose.Schema(
  {
    item: { type: mongoose.Schema.Types.Mixed, required: true },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Bikes = mongoose.model("Bike", bikeSchema);
export default Bikes;
