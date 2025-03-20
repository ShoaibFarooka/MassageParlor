const Joi = require("joi");

const createBookingSchema = Joi.object({
  serviceId: Joi.string().required(),
  userId: Joi.string().required(),
  startDate: Joi.date().required(),
  startTime: Joi.string().required(),
  endTime: Joi.string().required(),
  color: Joi.string().required(),
  status: Joi.string().required(),
  price: Joi.number().required(),
});

const updateBookingSchema = Joi.object({
  startDate: Joi.date().optional(),
  startTime: Joi.string().optional(),
  endTime: Joi.string().optional(),
  price: Joi.number().optional(),
});

const bookingIdSchema = Joi.object({
  _id: Joi.string().required(),
});

module.exports = {
  createBookingSchema,
  updateBookingSchema,
  bookingIdSchema,
};
