const bookingService = require("../services/bookingServices");

const createBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json({ message: "Booking created successfully!", booking });
  } catch (error) {
    next(error);
  }
};

const getBookings = async ( res, next) => {
  try {
    const bookings = await bookingService.getBookings();
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

const getBookingById = async (req, res, next) => {
  try {
    const booking = await bookingService.getBookingById(req.params.id);
    if (!booking)
      return res.status(404).json({ message: "Booking not found!" });
    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

const getBookingsByUserId = async (req, res, next) => {
  try {
    const bookings = await bookingService.getBookingsByUserId(req.params.userId);
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this user!" });
    }
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

const getBookingsByServiceId = async (req, res, next) => {
  try {
    const bookings = await bookingService.getBookingsByServiceId(req.params.serviceId);
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this service!" });
    }
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

const getBookingsByServiceProvider = async (req, res, next) => {
  try {
    const bookings = await bookingService.getBookingsByServiceProvider(req.params.serviceProviderId);
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this service!" });
    }
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

const updateBooking = async (req, res, next) => {
  try {
    const updatedBooking = await bookingService.updateBooking(req.params.id, req.body);
    if (!updatedBooking)
      return res.status(404).json({ message: "Booking not found!" });
    res.status(200).json({ message: "Booking updated successfully!", updatedBooking });
  } catch (error) {
    next(error);
  }
};

const deleteBooking = async (req, res, next) => {
  try {
    const deletedBooking = await bookingService.deleteBooking(req.params.id);
    if (!deletedBooking)
      return res.status(404).json({ message: "Booking not found!" });
    res.status(200).json({ message: "Booking deleted successfully!" });
  } catch (error) {
    next(error);
  }
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
