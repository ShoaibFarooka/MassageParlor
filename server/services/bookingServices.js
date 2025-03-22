const Booking = require("../models/bookingModel");

const createBooking = async (bookingData) => {
  return await Booking.create(bookingData);
};

const getBookings = async () => {
  return await Booking.find().populate("service_id user_id");
};

const getBookingById = async (bookingId) => {
  return await Booking.findById(bookingId).populate("service_id user_id");
};

const getBookingsByUserId = async (userId) => {
  return await Booking.find({ user_id: userId }).populate("service_id user_id");
};

const getBookingsByServiceId = async (serviceId) => {
  return await Booking.find({ serviceId }).populate("service_id user_id");
};

const getBookingsByServiceProvider = async (serviceProvider) => {
  return await Booking.find({ serviceProvider }).populate("service_id user_id");
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
  getBookingsByServiceProvider,
  updateBooking,
  deleteBooking,
};
