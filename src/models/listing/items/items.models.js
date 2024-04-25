import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    item: { type: mongoose.Schema.Types.Mixed, required: true },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
  },
  { strict: false, timestamps: true }
);
const Item = mongoose.model("Item", itemSchema);
export default Item;
