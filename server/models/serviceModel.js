const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    serviceProvider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    gallery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "gallery",
        required: false,
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
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", ServiceSchema);
