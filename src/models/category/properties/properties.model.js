import mongoose from "mongoose";

const propertiesSaleShema = new mongoose.Schema(
  {
    item: { type: mongoose.Schema.Types.Mixed, required: true },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Properties = mongoose.model("PropertiesSale", propertiesSaleShema);
export default Properties;
