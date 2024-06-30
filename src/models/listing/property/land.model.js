import mongoose from "mongoose";

const landSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // sellingType: {
  //   type: String,
  //   required: true,
  //   enum: ["for selling", "for rent"],
  // },
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
    enum: ["Agricultural Land", "Residential Plot"],
  },
  totalArea: {
    type: Number,
    required: true,
  },
  measurementType: {
    type: String,
    required: true,
    enum: ["Sq ft", "Yard", "Dhur", "Kattha", "Bigha", "Acre"],
  },
  listedBy: {
    type: String,
    required: true,
    enum: ["Owner", "Dealer"],
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
});
const Land = mongoose.model("Land", landSchema);
export default Land;
