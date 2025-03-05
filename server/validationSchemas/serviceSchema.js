const yup = require("yup");

const createServiceSchema = yup.object().shape({
  serviceProvider: yup.string().trim().required(),
  gallery: yup.string().trim().required(),
  name: yup.string().trim().required(),
  price: yup.number().min(0).required(),
  duration: yup.string().trim().required(),
  calendarColor: yup.string().trim().optional(),
  description: yup.string().trim().max(500).optional(),
  status: yup.string().oneOf(["Pending", "Approved", "Rejected"]).default("Pending"),
  filters: yup.object().shape({
    location: yup.string().trim().optional(),
    ethnicity: yup.string().oneOf(["Black", "White", "Asian", "Hispanic", "Other"]).optional(),
    hairColor: yup.string().oneOf(["Blonde", "Brown", "Black", "Red"]).optional(),
    height: yup.number().min(100).max(250).optional(),
  }).optional(),
});

const updateServiceSchema = createServiceSchema.noUnknown(true).optional();

const serviceIdSchema = yup.object().shape({
  id: yup.string().trim().required(),
});

module.exports = {
  createServiceSchema,
  updateServiceSchema,
  serviceIdSchema,
};
