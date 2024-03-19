import mongoose from "mongoose";

const computer_laptopSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["computer", "laptop"],
    },
    brandName: {
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
    },
    additionalInformation: {
      type: String,
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

const ComputerLaptop = mongoose.model("ComputerLaptop", computer_laptopSchema);
export default ComputerLaptop;
