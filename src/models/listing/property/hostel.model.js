import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    productType: {
      type: String,
      required: [true, "product type is required"],
    },
    type: {
      type: String,
      required: true,
      enum: ["PG / Hostel", "Roommate", "Guest House"],
    },
    propertyName: {
      type: String,
      required: true,
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
    furnishing: {
      type: String,
      required: true,
      enum: ["Furnished", "Semi Furnished", "Unfurnished"],
    },
    listedBy: {
      type: String,
      required: true,
      enum: ["Owner", "Dealer"],
    },
    carpetArea: {
      type: Number,
    },
    floorInBuilding: {
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
const Hostel = mongoose.model("Hostel", hostelSchema);
export default Hostel;
