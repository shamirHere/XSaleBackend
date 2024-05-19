import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          // Validate if the phone number is exactly 10 digits
          return /^\d{10}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid phone number! Please provide a 10-digit number.`,
      },
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    profilePicture: {
      type: String,
      required: false, // Field is optional
      default: null,
    },
    currentAddress: {
      type: String,
      required: true,
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.userName && typeof this.userName === "string") {
    this.userName = this.userName.trim().replace(/\s+/g, " ");
  }
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
