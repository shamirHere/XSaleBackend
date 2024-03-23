import mongoose from "mongoose";

const dogSchema = new mongoose.Schema(
  {
    breed: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    age: {
      type: Number,
      required: true,
    },
    vaccination: {
      type: String,
      required: true,
      enum: ["No Vaccination", "DHPP"],
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

const Dog = mongoose.model("Dog", dogSchema);
export default Dog;
