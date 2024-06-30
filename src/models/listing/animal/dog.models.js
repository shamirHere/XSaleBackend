import mongoose from "mongoose";

const dogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    categoryName: {
      type: String,
      required: true,
    },
    productType: {
      type: String,
      required: [true, "product type is required"],
    },
    breed: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
    age: {
      type: Number,
      required: true,
    },
    vaccination: {
      type: String,
      enum: ["No Vaccination", "DHPP"],
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

const Dog = mongoose.model("Dog", dogSchema);
export default Dog;
