const commonService = require('./commonService');
const stripe = require('../configs/stripe.config');
const Subscription = require("../models/subscriptionModel");

const webHookKey = process.env.STRIPE_WEBHOOK_KEY

const fetchProductInfo = async (productId) => {
    try {
        const product = await stripe.products.retrieve(productId);
        if (!product) {
            const error = new Error('Product not found in Stripe!');
            error.code = 404;
            throw error;
        }

        if (!product.active) {
            const error = new Error('Product is not active!');
            error.code = 400;
            throw error;
        }

        const prices = await stripe.prices.list({
            product: productId,
            limit: 100,
        });

        if (!prices || prices.data.length <= 0) {
            const error = new Error('Product Prices not found in Stripe!');
            error.code = 404;
            throw error;
        }

        const productInfo = {
            productId: product.id,
            name: product.name,
            description: product.description,
            image: (product.images && product.images.length > 0) ? product.images[0] : null,
            priceId: prices.data[0].id,
            price: prices.data[0].unit_amount / 100,
            currency: prices.data[0].currency,
            type: prices.data[0].recurring ? 'Subscription' : 'Consultation',
        };

        return productInfo;
    } catch (err) {
        if (err.code && !isNaN(err.code)) {
            throw err;
        } else {
            const error = new Error('Error while fetching product info from Stripe!');
            error.code = 400;
            throw error;
        }
    }
};

const createCustomer = async (name, email) => {
    const customer = await stripe.customers.create({ name, email });
    if (!customer) {
        const error = new Error('Unable to create customer!');
        error.code = 400;
        throw error;
    }
    return customer.id;
};

const updateCustomerEmail = async (stripeCustomerId, newEmail) => {
    const customer = await stripe.customers.update(stripeCustomerId, { email: newEmail });
    if (!customer) {
        const error = new Error('Unable to update customer!');
        error.code = 400;
        throw error;
    }
};

const createCheckoutSession = async (priceId, stripeCustomerId, CLIENT_URL) => {
    try {
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: `${CLIENT_URL}/success`,
            cancel_url: `${CLIENT_URL}/service/plans`,
            customer: stripeCustomerId,
        });
        return session.url;
    } catch (error) {
        const newError = new Error('Unable to create checkout session!');
        newError.code = 400;
        throw newError;
    }
};

const constructEvent = (rawBody, sig, secret) => {
    try {
        return stripe.webhooks.constructEvent(rawBody, sig, secret);
    } catch (err) {
        throw new Error("Unable to construct event: " + err.message);
    }
};

const handlePaymentSucceededEvent = async (event) => {
    try {
        const invoice = event.data.object;
        const customerId = invoice.customer;

        const userId = await commonService.fetchUserId({ stripeCustomerId: customerId });

        const invoiceId = invoice.id;
        const billingReason = invoice.billing_reason;

        const subscriptionId =
            invoice.subscription ||
            invoice.lines.data[0]?.parent?.subscription_item_details?.subscription ||
            null;

        const lineItem = invoice.lines.data[invoice.lines.data.length - 1];
        const priceDetails = lineItem.pricing.price_details;
        const productId = priceDetails.product;
        const { name, description } = await stripe.products.retrieve(productId);

        const planInfo = {
            productId,
            name,
            description: description || 'N/A',
            priceId: priceDetails.price,
            amount: parseInt(lineItem.amount) / 100,
            currency: invoice.currency,
        };

        const paidAmount = invoice.amount_paid / 100;
        const startDate = new Date(lineItem.period.start * 1000).toISOString();
        const endDate = new Date(lineItem.period.end * 1000).toISOString();

        return {
            user: userId,
            customerId,
            subscriptionInfo: {
                subscriptionId,
                invoiceId,
                planInfo,
                paidAmount,
                billingReason,
                startDate,
                endDate
            }
        };
    } catch (error) {
        const newError = new Error(`Unable to fetch info from event!`);
        newError.code = 400;
        throw newError;
    }
};

const handleSubscriptionUpdatedEvent = async (event) => {
    try {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        const userId = await commonService.fetchUserId({ stripeCustomerId: customerId });
        const subscriptionId = subscription.id;
        const price = subscription.items.data[0].price;
        const productId = price.product;
        const { name, description } = await stripe.products.retrieve(productId);

        const planInfo = {
            productId,
            name,
            description,
            priceId: price.id,
            amount: price.unit_amount / 100,
            currency: price.currency,
        };

        return {
            user: userId,
            customerId,
            subscriptionInfo: {
                subscriptionId,
                planInfo,
            }
        };
    } catch (error) {
        const newError = new Error(`Unable to fetch info from event!`);
        newError.code = 400;
        throw newError;
    }
};

const createBillingPortalSession = async (customerId, CLIENT_URL) => {
    if (!customerId) {
        const error = new Error('Customer not found!');
        error.code = 404;
        throw error;
    }
    try {
        const session = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${CLIENT_URL}/billing`,
        });
        return session.url;
    } catch (error) {
        const newError = new Error(`Unable to create billing portal session!`);
        newError.code = 400;
        throw newError;
    }
};

const fetchSubscription = async (subscriptionId) => {
    try {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        return subscription;
    } catch (error) {
        const newError = new Error(`Unable to fetch subscription!`);
        newError.code = 404;
        throw newError;
    }
};

const updateSubscription = async (subscriptionId, newPriceId) => {
    try {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
            items: [{
                id: subscription.items.data[0].id,
                price: newPriceId
            }],
            proration_behavior: 'always_invoice',
        });

        return updatedSubscription;
    } catch (error) {
        const newError = new Error(`Unable to update subscription!`);
        newError.code = 400;
        throw newError;
    }
};

const checkPaymentStatus = async (subscriptionId) => {
    try {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        if (!subscription) {
            throw new Error("Subscription not found on Stripe.");
        }

        const status = subscription.status;

        await Subscription.updateOne(
            { "subscriptions.subscriptionId": subscriptionId },
            {
                $set: {
                    "subscriptions.$.status":
                        status === "active" ? "active"
                            : status === "canceled" ? "inactive"
                                : "refunded"
                },
            }
        );

        return {
            success: true,
            status,
        };
    } catch (error) {
        console.error("Error checking payment status:", error.message);
        return {
            success: false,
            message: error.message,
        };
    }
};


module.exports = {
    fetchProductInfo,
    createCustomer,
    updateCustomerEmail,
    constructEvent,
    handlePaymentSucceededEvent,
    handleSubscriptionUpdatedEvent,
    createCheckoutSession,
    createBillingPortalSession,
    fetchSubscription,
    updateSubscription,
    checkPaymentStatus,
};
