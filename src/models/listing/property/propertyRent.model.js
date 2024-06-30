import mongoose from "mongoose";

const propertyRentSchema = new mongoose.Schema(
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
      enum: [
        "Flat",
        "House",
        "Farm House",
        "Shop",
        "Office",
        "Other commercial property",
      ],
    },
    bedroom: {
      type: String,
    },
    bathroom: {
      type: String,
      required: true,
    },
    furnishing: {
      type: String,
      required: true,
      enum: ["Furnished", "Semi Furnished", "Unfurnished"],
    },
    listedBy: {
      type: String,
      required: true,
      enum: ["Owner", "Broker"],
    },
    carpetArea: {
      type: String,
      required: true,
    },
    whichFloor: {
      type: String,
      required: true,
    },
    totalFloor: {
      type: String,
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
const PropertyRent = mongoose.model("PropertyRent", propertyRentSchema);
export default PropertyRent;
