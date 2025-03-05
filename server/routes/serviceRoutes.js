const router = require("express").Router();
const controller = require("../controllers/serviceController");
const authMiddleware = require("../middleware/authMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");
const serviceSchemas = require("../validationSchemas/serviceSchema");

// CRUD routes
router.post(
  "/",
  // authMiddleware.authenticateRequest,
  // validationMiddleware.validateRequest(serviceSchemas.createServiceSchema),
  controller.createService
);

router.get("/", controller.getServices);

router.get("/:id", controller.getServiceById);

router.get("/provider/:providerId", controller.getServicesByProviderId);

router.patch(
  "/:id",
  authMiddleware.authenticateRequest,
  validationMiddleware.validateParams(serviceSchemas.serviceIdSchema),
  validationMiddleware.validateRequest(serviceSchemas.updateServiceSchema),
  controller.updateService
);

router.delete(
  "/:id",
  authMiddleware.authenticateRequest,
  validationMiddleware.validateParams(serviceSchemas.serviceIdSchema),
  controller.deleteService
);

module.exports = router;
