const Booking = require("../models/bookingModel");

const createBooking = async (bookingData) => {
  return await Booking.create(bookingData);
};

const getBookings = async () => {
  return await Booking.find().populate("serviceId userId");
};

const getBookingById = async (bookingId) => {
  return await Booking.findById(bookingId).populate("serviceId userId");
};

const getBookingsByUserId = async (userId) => {
  return await Booking.find({ userId }).populate("serviceId userId");
};

const getBookingsByServiceId = async (serviceId) => {
  return await Booking.find({ serviceId }).populate("serviceId userId");
};

const updateBooking = async (bookingId, updatedData) => {
  return await Booking.findByIdAndUpdate(bookingId, updatedData, { new: true });
};

const deleteBooking = async (bookingId) => {
  return await Booking.findByIdAndDelete(bookingId);
};

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  getBookingsByUserId,
  getBookingsByServiceId,
  updateBooking,
  deleteBooking,
};
