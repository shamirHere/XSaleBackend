import mongoose from "mongoose";

const dogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
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
      enum: ["no Vaccination", "DHPP"],
    },
    additionalInformation: {
      type: String,
    },
    media: [{ type: String, required: true }],
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
