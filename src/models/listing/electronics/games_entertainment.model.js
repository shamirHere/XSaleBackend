import mongoose from "mongoose";

const games_entertainmentSchema = new mongoose.Schema(
  {
    adTitle: {
      type: String,
      required: true,
    },
    desciption: {
      type: String,
      required: true,
    },
    images: [{ type: String, required: true }],
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
const GamesEntertainment = mongoose.model(
  "GamesEntertainment",
  games_entertainmentSchema
);
export default GamesEntertainment;
