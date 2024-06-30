import mongoose from "mongoose";

const poultrySchema = new mongoose.Schema(
  {
    item: { type: mongoose.Schema.Types.Mixed, required: true },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Poultry = mongoose.model("Poultry", poultrySchema);
export default Poultry;
