const router = require("express").Router();
const controller = require("../controllers/subscriptionController");
const authMiddleware = require("../middleware/authMiddleware");
const subscriptionSchemas = require("../validationSchemas/subscriptionSchemas");
const validationMiddleware = require("../middleware/validationMiddleware");


router.get(
    "/get-user-subscription-info",
    authMiddleware.authenticateRequest,
    authMiddleware.verifyRole(["service-provider"]),
    controller.GetUserSubscriptionInfo
);

router.post(
    "/add-subscription",
    authMiddleware.authenticateRequest,
    authMiddleware.verifyRole(["service-provider"]),
    validationMiddleware.validateRequest(subscriptionSchemas.addSubscriptionSchema),
    controller.AddSubscription
);

router.patch(
    "/update-subscription",
    authMiddleware.authenticateRequest,
    authMiddleware.verifyRole(["service-provider"]),
    validationMiddleware.validateRequest(subscriptionSchemas.updateSubscriptionSchema),
    controller.UpdateSubscription
);

router.get(
    "/check-payment-status",
    authMiddleware.authenticateRequest,
    authMiddleware.verifyRole(["service-provider"]),
    controller.CheckPaymentStatus
);

module.exports = router;
