import mongoose from "mongoose";

const propertyRentShema = new mongoose.Schema(
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

const PropertiesRent = mongoose.model("PropertyRent", propertyRentShema);
export default propertyRentShema;
