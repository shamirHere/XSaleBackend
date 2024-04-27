import mongoose from "mongoose";

const poultrySchema = new mongoose.Schema(
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

const Poultry = mongoose.model("Poultry", poultrySchema);
export default Poultry;
