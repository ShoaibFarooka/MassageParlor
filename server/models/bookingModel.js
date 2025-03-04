const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // The user who books the service
      required: true,
    },
    service_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "service", 
      required: true,
    },
    serviceProvider_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // The service provider offering the service
      required: true,
    },
    startDate: {
      type: Date, 
      required: true,
    },
    startTime: {
      type: String, 
      required: true,
    },
    endTime: {
      type: String, 
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
