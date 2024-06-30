import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    productType: {
      type: String,
      required: [true, "product type is required"],
    },
    role: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    jobLocation: {
      type: String,
      required: true,
    },
    salaryRange: {
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
  },
  { timestamps: true }
);

const Job = mongoose.model("Jobs", jobSchema);
export default Job;
