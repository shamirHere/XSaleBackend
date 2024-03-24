import mongoose from "mongoose";

const cow_buffalo_schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["cow", "buffalo"],
      required: [true, "type of the animal is required cow or buffalo"],
    },
    breed: {
      type: String,
      required: [true, "breed of the animal is required"],
    },
    lactation: {
      type: Number,
      required: [true, "lcatation cycle of the animal is required"],
    },
    currentCapacity: {
      type: Number,
    },
    maximumCapacity: {
      type: Number,
      required: [true, "maximum capacity per day is required"],
    },
    hasDeliveredBaby: {
      type: Boolean,
      default: false,
    },
    whenDelivered: {
      type: String,
    },
    hasCalf: {
      type: Boolean,
      default: false,
    },
    isPregnant: {
      type: Boolean,
      default: false,
    },
    monthsPregnant: {
      type: Number,
      default: false,
    },
    additionalInformation: {
      type: String,
    },
    media: [
      {
        type: String,
        required: true,
        validate: {
          validator: (value) => {
            const urlRegex = /^(http|https):\/\/[^\s]+/;
            return urlRegex.test(value);
          },
          message:
            "Invalid media URL. Please enter a valid image or video URL.",
        },
      },
    ],
    location: {
      required: true,
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

const CowBuffalo = mongoose.model("CowBuffalo", cow_buffalo_schema);
export default CowBuffalo;
