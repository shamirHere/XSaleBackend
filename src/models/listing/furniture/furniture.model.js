import mongoose from "mongoose";
const furnitureSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productType: {
      type: String,
      required: [true, "product type is required"],
    },
    furnitureName: {
      type: String,
      required: true,
    },
    additionalInformation: {
      type: String,
    },
    media: [
      {
        type: String,
        required: true,
      },
    ],
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
    askingPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Furniture = mongoose.model("Furniture", furnitureSchema);
export default Furniture;
