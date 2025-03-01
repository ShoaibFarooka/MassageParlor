const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    number: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    dateOfBirth: {
      type: String,
      default: null,
      trim: true,
    },
    address: {
      type: String,
      required: false,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "service-provider", "user"],
    },
    ethnicity: {
      type: String,
      required: false,
      trim: true,
    },
    location: {
      type: String,
      required: false,
      trim: true,
    },
    height: {
      type: String,
      required: false,
      trim: true,
    },
    hair_color: {
      type: String,
      required: false,
      trim: true,
    },
    call_out_type: {
      type: String,
      required: false,
      trim: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    resetToken: {
      type: String,
      default: null,
    },
    resetTokenExpiry: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
