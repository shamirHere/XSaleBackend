import mongoose from "mongoose";

const propertySaleSchema = new mongoose.Schema(
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
      type: Number,
      required: true,
    },
    whichFloor: {
      type: Number,
      required: true,
    },
    totalFloor: {
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
      require: true,
    },
    askingPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const Property = mongoose.model("PropertySale", propertySaleSchema);
export default Property;
