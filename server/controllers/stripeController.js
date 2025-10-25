const stripeService = require('../services/stripeService');
const userService = require('../services/userService');
const subscriptionService = require('../services/subscriptionService');

const CreateCheckoutSession = async (req, res, next) => {
    try {
        const CLIENT_URL = req.get('origin');
        const { priceId } = req.body;
        const userId = req.user?.id;

        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

        let stripeCustomerId = await userService.fetchUserStripeCustomerId(userId);
        if (!stripeCustomerId) {
            const user = await userService.fetchUser(userId);
            stripeCustomerId = await stripeService.createCustomer(user.name, user.email);
            await userService.updateUser(userId, { stripeCustomerId });
        }

        const sessionURL = await stripeService.createCheckoutSession(priceId, stripeCustomerId, CLIENT_URL);
        res.status(200).json({ url: sessionURL });
    } catch (error) {
        next(error);
    }
};

const StripeHooks = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const rawBody = req.body;

    try {
        const event = stripeService.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_KEY);

        switch (event.type) {
            case "invoice.payment_succeeded": {
                const paymentData = await stripeService.handlePaymentSucceededEvent(event);
                await subscriptionService.addSubscription(paymentData);
                console.log("Subscription added");
                break;
            }
            case "customer.subscription.updated": {
                const subscription = await stripeService.handleSubscriptionUpdatedEvent(event);
                await subscriptionService.UpdateSubscription(subscription);
                console.log("Subscription updated");
                break;
            }
            default:
                console.log("Unhandled event type:", event.type);
        }

        res.status(200).send("ok");
    } catch (err) {
        console.error("Webhook Error:", err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
};


const CreateBillingPortalSession = async (req, res, next) => {
    try {
        const CLIENT_URL = req.get('origin');
        const userId = req.user?.id;
        const customerId = await userService.fetchUserStripeCustomerId(userId);

        const sessionURL = await stripeService.createBillingPortalSession(customerId, CLIENT_URL);
        res.status(200).json({ url: sessionURL });
    } catch (error) {
        next(error);
    }
};

const UpdateSubscription = async (req, res, next) => {
    try {
        const { newPriceId } = req.body;
        const userId = req.user?.id;

        const subscriptionInfo = await subscriptionService.getUserSubscriptionInfo(userId);

        const activeSub = subscriptionInfo?.data?.subscriptions?.find(sub => sub.status === "active");
        if (!activeSub) {
            return res.status(400).json({ error: 'No active subscription found!' });
        }
        await stripeService.updateSubscription(activeSub.subscriptionId, newPriceId);

        res.status(200).json({ message: 'Subscription updated successfully!' });
    } catch (error) {
        next(error);
    }
};



const CheckPaymentStatus = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

        const localStatus = await subscriptionService.checkPaymentStatus(userId);

        if (localStatus?.subscriptionId) {
            const stripeStatus = await stripeService.checkPaymentStatus(localStatus.subscriptionId);

            if (stripeStatus.status !== localStatus.status) {
                await subscriptionService.updateSubscription(userId, stripeStatus.status);
            }

            return res.status(200).json({
                success: true,
                message: "Payment status verified successfully.",
                dbStatus: localStatus.status,
                stripeStatus: stripeStatus.status,
                planName: localStatus.planName || "Free Plan",
            });
        }

        return res.status(200).json({
            success: true,
            message: "No active subscription found.",
            dbStatus: "inactive",
            stripeStatus: "inactive",
            planName: "Free Plan",
        });
    } catch (error) {
        console.error("CheckPaymentStatus Error:", error);
        next(error);
    }
};

module.exports = {
    CreateCheckoutSession,
    StripeHooks,
    CreateBillingPortalSession,
    UpdateSubscription,
    CheckPaymentStatus,
};
