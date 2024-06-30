import mongoose from "mongoose";

const electronicsShema = new mongoose.Schema(
  {
    item: { type: mongoose.Schema.Types.Mixed, required: true },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Electronics = mongoose.model("Electronic", electronicsShema);
export default Electronics;
