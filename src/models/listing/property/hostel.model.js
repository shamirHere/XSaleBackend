import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
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
      enum: ["PG/Hostel", "Guest House"],
    },
    availableFor: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Male & Female both"],
    },
    mealIncludes: {
      type: String,
      required: true,
      enum: ["Yes", "No", "Available on Extra cost"],
    },
    roomSharing: {
      type: String,
      required: true,
      enum: [
        "Single Room",
        "2 sharing",
        "3 sharing",
        "4 sharing",
        "4+ sharing",
      ],
    },
    bathroom: {
      type: String,
      required: true,
      enum: ["Attached Bathroom", "Common Bathroom"],
    },
    listedBy: {
      type: String,
      required: true,
      enum: ["Owner", "Dealer"],
    },
    carpetArea: {
      type: Number,
      required: true,
    },
    totalFloor: {
      type: Number,
      required: true,
    },
    whichFloor: {
      type: Number,
      required: true,
    },
    liftAvailable: {
      type: String,
      required: true,
      enum: ["Yes", "No"],
    },
    parkingAvailable: {
      type: String,
      required: true,
      enum: ["Yes", "No"],
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
const Hostel = mongoose.model("Hostel", hostelSchema);
export default Hostel;
