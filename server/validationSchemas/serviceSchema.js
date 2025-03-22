const yup = require("yup");

const createServiceSchema = yup.object().shape({
  serviceProvider: yup.string().trim().required(),
  gallery: yup.string().trim().required(),
  name: yup.string().trim().required(),
  price: yup.number().min(0).required(),
  duration: yup.string().trim().required(),
  calendarColor: yup.string().trim().optional(),
  isActive: yup.boolean(),
  description: yup.string().trim().max(500).optional(),
  status: yup.string().oneOf(["Pending", "Approved", "Rejected"]).default("Pending"),
});

const updateServiceSchema = yup.object({
  isActive: yup.boolean(),
  serviceProvider: yup.string().trim(),
  gallery: yup.string().trim(),
  name: yup.string().trim(),
  price: yup.number().min(0),
  duration: yup.string().trim(),
  calendarColor: yup.string().trim().optional(),
  isActive: yup.boolean(),
  description: yup.string().trim().max(500).optional(),
  status: yup.string(),
});

const serviceIdSchema = yup.object().shape({
  id: yup.string().trim().required(),
});

module.exports = {
  createServiceSchema,
  updateServiceSchema,
  serviceIdSchema,
};
