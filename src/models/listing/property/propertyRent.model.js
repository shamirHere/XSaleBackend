import mongoose from "mongoose";

const propertyRentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    sellingType: {
      type: String,
      required: true,
      enum: ["for sale", "for rent"],
    },
    productType: {
      type: String,
      required: [true, "product type is required"],
    },
    type: {
      type: String,
      required: true,
      enum: ["Flat", "House", "Farm House"],
    },
    propertyName: {
      type: String,
      required: true,
    },
    bedrooms: {
      type: String,
      required: true,
      enum: ["1", "2", "3", "4", "5", "5+"],
    },
    bathroom: {
      type: String,
      required: true,
      enum: ["1", "2", "3", "3+"],
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
const PropertyRent = mongoose.model("PropertyRent", propertyRentSchema);
export default PropertyRent;
