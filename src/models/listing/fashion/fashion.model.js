import mongoose from "mongoose";

const fashionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    clothing: {
      type: String,
      required: true,
      minlength: [
        10,
        "clothing of this fashion ad must be at least 10 characters long",
      ],
    },
    additionalInformation: {
      type: String,
      required: true,
      minlength: [
        10,
        "additional information of this fashion ad must be at least 10 characters long",
      ],
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
const Fashion = mongoose.model("Fashion", fashionSchema);
export default Fashion;
