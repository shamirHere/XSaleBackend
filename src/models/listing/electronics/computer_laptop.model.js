import mongoose from "mongoose";

const computer_laptopSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productType: {
      type: String,
      required: [true, "product type is required"],
    },
    type: {
      type: String,
      required: true,
      enum: ["computer", "laptop"],
    },
    brand: {
      type: String,
      required: true,
    },
    ram: {
      type: Number,
      required: true,
    },
    ssd_hdd: {
      type: Number,
      required: true,
      enum: ["SSD", "HD", "SSD/HD"],
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

const ComputerLaptop = mongoose.model("ComputerLaptop", computer_laptopSchema);
export default ComputerLaptop;
