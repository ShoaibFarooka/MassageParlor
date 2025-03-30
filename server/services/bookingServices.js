const { default: mongoose } = require("mongoose");
const Booking = require("../models/bookingModel");
const moment = require("moment");


const createBooking = async (bookingData) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { startDate, startTime, endTime, serviceProvider } = bookingData;

    // Parse booking times in UTC with proper format
    const startDateTime = moment.utc(`${startDate} ${startTime}`, "YYYY-MM-DD hh:mm A");
    const endDateTime = moment.utc(`${startDate} ${endTime}`, "YYYY-MM-DD hh:mm A");

    // If end time is not after start (crossing midnight case)
    const adjustedEndDateTime = endDateTime.isAfter(startDateTime) 
      ? endDateTime 
      : endDateTime.add(1, 'day');

    console.log("New booking start:", startDateTime.toString());
    console.log("New booking end:", adjustedEndDateTime.toString());

    const serviceProviderId = new mongoose.Types.ObjectId(serviceProvider);

    // Check for overlapping bookings (including approved ones)
    const conflict = await Booking.findOne({
      serviceProvider: serviceProviderId,
      status: 'Approved', // Only check against approved bookings
      $or: [
        // Case 1: New booking starts during an existing booking
        {
          startDateTime: { $lte: startDateTime.toDate() },
          endDateTime: { $gt: startDateTime.toDate() }
        },
        // Case 2: New booking ends during an existing booking
        {
          startDateTime: { $lt: adjustedEndDateTime.toDate() },
          endDateTime: { $gte: adjustedEndDateTime.toDate() }
        },
        // Case 3: New booking completely contains an existing booking
        {
          startDateTime: { $gte: startDateTime.toDate() },
          endDateTime: { $lte: adjustedEndDateTime.toDate() }
        }
      ]
    }).session(session);

    if (conflict) {
      console.log("Conflict found:", {
        existingStart: conflict.startDateTime,
        existingEnd: conflict.endDateTime,
        newStart: startDateTime.toDate(),
        newEnd: adjustedEndDateTime.toDate()
      });
      throw new Error("This timing is already booked.");
    }

    // Create the new booking
    const newBooking = await Booking.create(
      [{
        ...bookingData,
        serviceProvider: serviceProviderId,
        startDateTime: startDateTime.toDate(),
        endDateTime: adjustedEndDateTime.toDate(),
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
