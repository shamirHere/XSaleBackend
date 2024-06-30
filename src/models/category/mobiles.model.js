import mongoose from "mongoose";

const mobileShema = new mongoose.Schema(
  {
    item: { type: mongoose.Schema.Types.Mixed, required: true },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Mobiles = mongoose.model("Mobile", mobileShema);
export default Mobiles;
