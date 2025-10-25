const moment = require("moment");
const Subscription = require("../models/subscriptionModel");



const getUserSubscriptionInfo = async (userId) => {
    const subscription = await Subscription.findOne({ user: userId });
    if (!subscription) {
        return {
            success: true,
            data: {
                subscriptions: [],
                customerId: null,
            },
        };
    }
    return {
        success: true,
        data: subscription,
    };
};

const addSubscription = async (data) => {
    try {
        const { user, customerId, subscriptionInfo } = data;

        subscriptionInfo.startDate = new Date(subscriptionInfo.startDate);
        subscriptionInfo.endDate = new Date(subscriptionInfo.endDate);
        subscriptionInfo.status = subscriptionInfo.status || "active";

        const existingUserSubscription = await Subscription.findOne({ user });

        const alreadyExists = existingUserSubscription?.subscriptions.some(
            sub => sub.subscriptionId === subscriptionInfo.subscriptionId
        );

        if (!existingUserSubscription) {
            await Subscription.create({
                user,
                customerId,
                subscriptions: [subscriptionInfo],
            });
        } else if (!alreadyExists) {
            existingUserSubscription.subscriptions.forEach(sub => {
                if (sub.status === "active") sub.status = "inactive";
            });

            existingUserSubscription.customerId = customerId;
            existingUserSubscription.subscriptions.push(subscriptionInfo);
            await existingUserSubscription.save();
        } else {
            const existingSub = existingUserSubscription.subscriptions.find(
                sub => sub.subscriptionId === subscriptionInfo.subscriptionId
            );
            existingSub.planInfo = subscriptionInfo.planInfo;
            existingSub.status = subscriptionInfo.status;
            existingSub.startDate = subscriptionInfo.startDate;
            existingSub.endDate = subscriptionInfo.endDate;
            await existingUserSubscription.save();
        }
    } catch (error) {
        console.error("AddSubscriptionError:", error);
        const newError = new Error("Unable to add subscription!");
        newError.code = 400;
        throw newError;
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
        const customerId = subscriptionInfo.data.customerId;

        const CLIENT_URL = req.get('origin');
        const sessionURL = await stripeService.createCheckoutSession(newPriceId, customerId, CLIENT_URL);

        res.status(200).json({ url: sessionURL });
    } catch (error) {
        next(error);
    }
};


const checkPaymentStatus = async (userId) => {
    try {
        const subscription = await Subscription.findOne({ user: userId });
        if (!subscription) {
            return {
                success: false,
                message: "No subscription found for this user",
                isVerified: false,
                planName: "Free Plan",
            };
        }

        const now = new Date();
        const activeSub = subscription.subscriptions.find(
            (sub) => sub.endDate >= now && sub.status === "active"
        );

        if (activeSub) {
            return {
                success: true,
                isVerified: true,
                planName: activeSub.planInfo?.name || "Free Plan",
                subscriptionId: activeSub.subscriptionId,
                startDate: activeSub.startDate,
                endDate: activeSub.endDate,
                autoRenew: activeSub.autoRenew,
                amount: activeSub.planInfo?.amount || 0,
                currency: activeSub.planInfo?.currency || "USD",
                status: activeSub.status,
            };
        }

        return {
            success: true,
            isVerified: false,
            planName: "Free Plan",
        };
    } catch (error) {
        console.error("CheckPaymentStatusError:", error);
        const newError = new Error("Unable to check payment status!");
        newError.code = 400;
        throw newError;
    }
};

module.exports = {
    addSubscription,
    UpdateSubscription,
    checkPaymentStatus,
    getUserSubscriptionInfo,
};
