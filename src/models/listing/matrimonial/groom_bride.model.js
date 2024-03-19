import mongoose from "mongoose";

const groom_brideSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["bride", "groom"],
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
    religion: {
      type: String,
      required: true,
    },
    caste: {
      type: String,
      required: true,
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
      required: true,
    },
    motherTounge: {
      type: String,
      required: true,
    },
    images: [{ type: String, required: true }],
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
  },
  { timestamps: true }
);
const BrideGroom = mongoose.model("BrideGroom", groom_brideSchema);
export default BrideGroom;
