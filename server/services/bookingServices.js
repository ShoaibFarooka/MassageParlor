const { default: mongoose } = require("mongoose");
const Booking = require("../models/bookingModel");
const moment = require("moment");


const createBooking = async (bookingData) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { startDate, startTime, endTime, serviceProvider } = bookingData;

    // Parse booking times for comparison
    const newStartDateTime = moment.utc(`${startDate} ${startTime}`, "YYYY-MM-DD hh:mm A");
    const newEndDateTime = moment.utc(`${startDate} ${endTime}`, "YYYY-MM-DD hh:mm A");
    
    // If end time is not after start (crossing midnight case)
    const adjustedNewEndDateTime = newEndDateTime.isAfter(newStartDateTime) 
      ? newEndDateTime 
      : newEndDateTime.add(1, 'day');

    console.log("New booking start:", newStartDateTime.toString());
    console.log("New booking end:", adjustedNewEndDateTime.toString());

    const serviceProviderId = new mongoose.Types.ObjectId(serviceProvider);

    // Find all bookings for this service provider on this date
    const existingBookings = await Booking.find({
      serviceProvider: serviceProviderId,
      startDate: startDate,
      status: { $in: ['Pending', 'Approved'] }
    }).session(session);

    // Check each booking for time conflicts
    for (const booking of existingBookings) {
      // Parse the existing booking's times
      const existingStartDateTime = moment.utc(`${booking.startDate} ${booking.startTime}`, "YYYY-MM-DD hh:mm A");
      const existingEndDateTime = moment.utc(`${booking.startDate} ${booking.endTime}`, "YYYY-MM-DD hh:mm A");
      
      // Handle midnight crossing for existing booking
      const adjustedExistingEndDateTime = existingEndDateTime.isAfter(existingStartDateTime) 
        ? existingEndDateTime 
        : existingEndDateTime.add(1, 'day');
      
      // Check for overlap
      const hasOverlap = (
        // New booking starts during existing booking
        (newStartDateTime.isSameOrAfter(existingStartDateTime) && newStartDateTime.isBefore(adjustedExistingEndDateTime)) ||
        // New booking ends during existing booking
        (adjustedNewEndDateTime.isAfter(existingStartDateTime) && adjustedNewEndDateTime.isSameOrBefore(adjustedExistingEndDateTime)) ||
        // New booking contains existing booking
        (newStartDateTime.isSameOrBefore(existingStartDateTime) && adjustedNewEndDateTime.isSameOrAfter(adjustedExistingEndDateTime))
      );

      if (hasOverlap) {
        console.log("Conflict found:", {
          existingStart: existingStartDateTime.format("hh:mm A"),
          existingEnd: adjustedExistingEndDateTime.format("hh:mm A"),
          newStart: newStartDateTime.format("hh:mm A"),
          newEnd: adjustedNewEndDateTime.format("hh:mm A")
        });
        throw new Error("This timing is already booked.");
      }
    }

    // Create the new booking if no conflicts
    const newBooking = await Booking.create(
      [{
        ...bookingData,
        serviceProvider: serviceProviderId,
        status: 'Pending' // Ensure status is set
      }],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return newBooking[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
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
