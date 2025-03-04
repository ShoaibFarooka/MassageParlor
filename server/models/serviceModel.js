const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    serviceProvider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    duration: {
      type: String, // e.g., '1h', '30m'
      required: true,
    },
    calendarColor: {
      type: String,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    filters: {
      location: {
        type: String,
      },
      ethnicity: {
        type: String,
        enum: ["Black", "White", "Asian", "Hispanic", "Other"],
      },
      hairColor: {
        type: String,
        enum: ["Blonde", "Brown", "Black", "Red"],
      },
      height: {
        type: Number,
        min: 100, // Minimum height in cm
        max: 250, // Maximum height in cm
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", ServiceSchema);
