import mongoose from "mongoose";

const animalSchema = new mongoose.Schema(
  {
    item: { type: mongoose.Schema.Types.Mixed, required: true },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Animals = mongoose.model("Animal", animalSchema);
export default Animals;
