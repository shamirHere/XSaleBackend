import mongoose from "mongoose";

const computer_laptopSchema = new mongoose.Schema(
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
    type: {
      type: String,
      required: true,
      enum: ["Computer", "Laptop"],
    },
    brand: {
      type: String,
      required: true,
    },
    ram: {
      type: Number,
      required: true,
    },
    storageType: {
      type: String,
      required: true,
      enum: ["SSD", "HD", "SSD/HD"],
    },
    storage: {
      type: Number,
      required: true,
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

const ComputerLaptop = mongoose.model("ComputerLaptop", computer_laptopSchema);
export default ComputerLaptop;
