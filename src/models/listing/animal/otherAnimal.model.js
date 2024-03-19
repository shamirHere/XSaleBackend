import mongoose from "mongoose";
const otherAnimalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ageInYear: {
      type: Number,
      required: true,
    },
    images: [{ type: String, required: true }],
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
const OtherAnimal = mongoose.model("OtherAnimal", otherAnimalSchema);

export default OtherAnimal;
