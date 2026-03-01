const subscriptionService = require('../services/subscriptionService');


const GetUserSubscriptionInfo = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

        const result = await subscriptionService.getUserSubscriptionInfo(userId);
        res.status(200).json(result);
    } catch (error) {
        console.error("GetUserSubscriptionInfoControllerError:", error);
        next(error);
    }
};
const AddSubscription = async (req, res, next) => {
    try {
        const { customerId, subscriptionInfo } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User not found in request",
            });
        }

        await subscriptionService.addSubscription({
            user: userId,
            customerId,
            subscriptionInfo,
        });

        res.status(200).json({
            success: true,
            message: "Subscription added or updated successfully",
        });
    } catch (error) {
        console.error("AddSubscriptionControllerError:", error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message || "Unable to add or update subscription",
        });
    }
};

const UpdateSubscription = async (req, res, next) => {
    try {
        const { customerId, subscriptionInfo } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User not found in request",
            });
        }

        await subscriptionService.updateSubscription({
            user: userId,
            customerId,
            subscriptionInfo,
        });

        res.status(200).json({
            success: true,
            message: "Subscription updated successfully",
        });
    } catch (error) {
        console.error("UpdateSubscriptionControllerError:", error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message || "Unable to update subscription",
        });
    }
};

const CheckPaymentStatus = async (req, res, next) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User not found in request",
            });
        }

        const result = await subscriptionService.checkPaymentStatus(userId);

        res.status(200).json({
            success: true,
            message: "Payment status retrieved successfully",
            data: result,
        });
    } catch (error) {
        console.error("CheckPaymentStatusControllerError:", error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message || "Unable to check payment status",
        });
    }
};

module.exports = {
    AddSubscription,
    UpdateSubscription,
    CheckPaymentStatus,
    GetUserSubscriptionInfo,
};
