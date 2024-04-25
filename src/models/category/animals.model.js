import mongoose from "mongoose";

const animalSchema = new mongoose.Schema(
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

const Animal = mongoose.model("Animal", animalSchema);
export default Animal;
