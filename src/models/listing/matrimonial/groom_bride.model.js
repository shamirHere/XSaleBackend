import mongoose from "mongoose";

const groom_brideSchema = new mongoose.Schema(
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
      enum: ["Bride", "Groom"],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    maritialStatus: {
      type: String,
      enum: ["Never married", "Divorced", "Seperated", "Widowed"],
      required: true,
    },
    religion: {
      type: String,
      required: true,
    },
    caste: {
      type: String,
    },
    motherTounge: {
      type: String,
    },
    educationQualification: {
      type: String,
      required: true,
    },
    currentOccupation: {
      type: String,
      required: true,
    },
    additionalInformation: {
      type: String,
    },
    media: [{ type: String, required: true }],
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
  },
  { timestamps: true }
);
const BrideGroom = mongoose.model("BrideGroom", groom_brideSchema);
export default BrideGroom;
