import mongoose from "mongoose";

const propertyRentShema = new mongoose.Schema(
  {
    item: { type: mongoose.Schema.Types.Mixed, required: true },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PropertiesRent = mongoose.model("PropertiesRent", propertyRentShema);
export default PropertiesRent;
