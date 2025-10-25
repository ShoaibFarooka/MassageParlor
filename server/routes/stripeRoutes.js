const router = require("express").Router();
const controller = require("../controllers/stripeController");
const authMiddleware = require("../middleware/authMiddleware");
const stripeSchemas = require('../validationSchemas/stripeSchemas');
const validationMiddleware = require('../middleware/validationMiddleware');

router.post(
    "/create-checkout-session",
    authMiddleware.authenticateRequest,
    authMiddleware.verifyRole(['service-provider']),
    validationMiddleware.validateRequest(stripeSchemas.createCheckoutSchema),
    controller.CreateCheckoutSession
);


router.post(
    "/create-billing-portal-session",
    authMiddleware.authenticateRequest,
    authMiddleware.verifyRole(['service-provider']),
    controller.CreateBillingPortalSession
);

router.patch(
    "/update-subscription",
    authMiddleware.authenticateRequest,
    authMiddleware.verifyRole(['service-provider']),
    validationMiddleware.validateRequest(stripeSchemas.updateSubscriptionSchema),
    controller.UpdateSubscription
);

router.get(
    "/check-payment-status",
    authMiddleware.authenticateRequest,
    authMiddleware.verifyRole(['service-provider']),
    controller.CheckPaymentStatus
);


module.exports = router;
