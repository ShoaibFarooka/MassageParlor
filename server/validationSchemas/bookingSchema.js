const yup = require("yup");


const createBookingSchema = yup.object({
  service_id: yup.string().required(),
  user_id: yup.string().required(),
  serviceProvider: yup.string().required(),
  startDate: yup.date().required(),
  startTime: yup.string().required(),
  endTime: yup.string().required(),
  color: yup.string().optional(),
  status: yup.string().required(),
  price: yup.number().required(),
});

const updateBookingSchema = yup.object({
  startDate: yup.date().optional(),
  startTime: yup.string().optional(),
  endTime: yup.string().optional(),
  price: yup.number().optional(),
});

const bookingIdSchema = yup.object({
  _id: yup.string().required(),
});

module.exports = {
  createBookingSchema,
  updateBookingSchema,
  bookingIdSchema,
};
