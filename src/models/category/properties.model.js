import mongoose from "mongoose";

const propertyShema = new mongoose.Schema(
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

const Properties = mongoose.model("Property", propertyShema);
export default Mobiles;
