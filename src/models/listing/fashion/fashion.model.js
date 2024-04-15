import mongoose from "mongoose";

const fashionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    adTitle: {
      type: String,
      required: true,
      minlength: [
        10,
        "title of this fashion ad must be at least 10 characters long",
      ],
    },
    desribeSelling: {
      type: String,
      required: true,
      minlength: [
        10,
        "description of this fashion ad must be at least 10 characters long",
      ],
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
const Fashion = mongoose.model("Fashion", fashionSchema);
export default Fashion;
