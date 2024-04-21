import mongoose from "mongoose";

const games_entertainmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productType: {
      type: String,
      required: [true, "product type is required"],
    },
    title: {
      type: String,
      required: true,
    },
    desciption: {
      type: String,
      required: true,
    },
    media: [{ type: String, required: true }],
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
    askingPrice: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const GameEntertainment = mongoose.model(
  "GamesEntertainment",
  games_entertainmentSchema
);
export default GameEntertainment;
