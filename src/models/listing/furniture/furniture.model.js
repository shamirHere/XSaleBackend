import mongoose from "mongoose";
const furnitureSchema = new mongoose.Schema(
  {
    furnitureName: {
      type: String,
      required: true,
    },
    additionalInformation: {
      type: String,
      requried: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
    aksingPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Furniture = mongoose.model("Furniture", furnitureSchema);
export default Furniture;
