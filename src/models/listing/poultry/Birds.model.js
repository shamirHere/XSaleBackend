import mongoose from "mongoose";

const birdSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    productType: {
      type: String,
      required: [true, "product type is required"],
    },
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    quantityType: {
      type: String,
      required: true,
      enum: ["Per kg", "Per piece"],
    },
    additionalInformation: {
      type: String,
    },
    media: [{ type: String, required: true }],
    location: {
      type: String,
      required: true,
    },
    askingPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Bird = mongoose.model("Bird", birdSchema);
export default Bird;
