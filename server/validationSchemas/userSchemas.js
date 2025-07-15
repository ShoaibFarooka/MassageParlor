const yup = require("yup");
const mongoose = require("mongoose");

const ObjectId = yup
  .string()
  .test("is-valid", "Invalid user ID", (value) =>
    mongoose.Types.ObjectId.isValid(value)
  );

const registerSchema = yup.object().shape({
  name: yup.string().trim().required("Name is required"),
  email: yup
    .string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
  number: yup.string().trim().required("Number is required"),
  dateOfBirth: yup.string().trim(),
  ethnicity: yup.string().trim(),
  location: yup.string().trim(),
  height: yup.string().trim(),
  hairColor: yup.string().trim(),
  callOutType: yup.string().trim(),
  file: yup.mixed().optional(),
  password: yup.string().trim().required("Password is required"),

});

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .trim()
    .required("Email is required"),
  password: yup.string().trim().required("Password is required"),
});

const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .trim()
    .required("Email is required"),
});

const userTypeSchema = yup.object().shape({
  userType: yup
    .string()
    .oneOf(["user", "service-provider"], "Invalid user type")
    .required("User type is required"),
});

const resetPasswordSchema = yup.object().shape({
  token: yup.string().trim().required("Token is required"),
  newPassword: yup.string().trim().required("New Password is required"),
});

const createUserSchema = yup.object().shape({
  name: yup.string().trim().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .trim()
    .required("Email is required"),
  number: yup.string().trim().required("Number is required"),
  dateOfBirth: yup.string().trim().required("Date of birth is required"),
  address: yup.string().trim().required("Address is required"),
  city: yup.string().trim().required("City is required"),
  zip: yup.string().trim().required("Zip is required"),
  password: yup.string().trim().required("Password is required"),
  notes: yup.string().trim(),
  isOnline: yup.boolean().optional(),
});

const updateUserSchema = yup.object().shape({
  file: yup.mixed().optional(),
  name: yup.string().trim(),
  email: yup.string().trim().email("Invalid email address"),
  number: yup.string().trim(),
  dateOfBirth: yup.string().trim(),
  ethnicity: yup.string().trim(),
  location: yup.string().trim(),
  height: yup.string().trim(),
  hairColor: yup.string().trim(),
  callOutType: yup.string().trim(),
  password: yup.string().trim(),
  isOnline: yup.boolean().optional(),
  isActive: yup.boolean().optional(),
  // password: yup.string().trim(),
});

const userIdSchema = yup.object().shape({
  userId: ObjectId.required("User ID is required"),
});

const searchUsersSchema = yup.object().shape({
  pageIndex: yup.number().required("Page index is required"),
  limit: yup
    .number()
    .positive("Limit must be positive")
    .required("Limit is required"),
  searchQuery: yup.string().trim(),
  status: yup.string().trim(),
});

const changeUserPasswordSchema = yup.object().shape({
  oldPassword: yup.string().trim().required("Old Password is required"),
  newPassword: yup.string().trim().required("New Password is required"),
});

module.exports = {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  userTypeSchema,
  createUserSchema,
  updateUserSchema,
  userIdSchema,
  searchUsersSchema,
  changeUserPasswordSchema,
};
