const router = require("express").Router();
const controller = require("../controllers/bookingController");
const authMiddleware = require("../middleware/authMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");
const bookingSchemas = require("../validationSchemas/bookingSchema");

// CRUD routes
router.post(
  "/",
  authMiddleware.authenticateRequest,
  validationMiddleware.validateRequest(bookingSchemas.createBookingSchema),
  controller.createBooking
);

router.get("/", controller.getBookings);

router.get("/:id", controller.getBookingById);

router.get("/user/:userId", controller.getBookingsByUserId);

router.get("/service/:serviceId", controller.getBookingsByServiceId);

router.get("/serviceProvider/:serviceProviderId", controller.getBookingsByServiceProvider);

router.patch(
  "/:id",
  authMiddleware.authenticateRequest,
  validationMiddleware.validateParams(bookingSchemas.bookingIdSchema),
  validationMiddleware.validateRequest(bookingSchemas.updateBookingSchema),
  controller.updateBooking
);

router.delete(
  "/:id",
  authMiddleware.authenticateRequest,
  validationMiddleware.validateParams(bookingSchemas.bookingIdSchema),
  controller.deleteBooking
);

module.exports = router;
