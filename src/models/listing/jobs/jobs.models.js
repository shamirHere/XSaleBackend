import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    minSalary: {
      type: Number,
      required: true,
    },
    maxSalary: {
      type: Number,
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

const Job = mongoose.model("Jobs", jobSchema);
export default Job;
