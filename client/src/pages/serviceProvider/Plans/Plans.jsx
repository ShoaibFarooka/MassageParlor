import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../../redux/loaderSlice";
import stripeService from "../../../services/stripeService";
import subscriptionService from "../../../services/subscriptionService";
import ServicesHeader from '../components/ServicesHeader';
import toast from 'react-hot-toast';

const Plans = () => {
    const [activePlan, setActivePlan] = useState(0);
    const [loading, setLoading] = useState(false);
    const [userSubscription, setUserSubscription] = useState(null);

    const dispatch = useDispatch();
    const plans = [
        {
            id: 0,
            name: "Free Plan",
            price: "$0/month",
            priceId: null,
            features: ["1 Website", "Basic Support", "100 MB Storage"],
        },
        {
            id: 1,
            name: "Basic Membership",
            price: "$19.99/month",
            priceId: import.meta.env.VITE_STRIPE_PRICE_ID,
            features: ["5 Websites", "Priority Support", "10 GB Storage"],
        },
    ];

    const fetchSubscription = async () => {
        try {
            dispatch(ShowLoading());
            const response = await subscriptionService.getUserSubscriptionInfo();
            if (response.success) {
                setUserSubscription(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch subscription:", error);
        } finally {
            dispatch(HideLoading());
        }
    };

    useEffect(() => {
        fetchSubscription();
    }, []);

    useEffect(() => {
        if (userSubscription?.subscriptions?.length > 0) {
            const activeSub = userSubscription.subscriptions.find(sub => sub.status === "active");
            if (activeSub) {
                const active = plans.find(p => p.name === activeSub.planInfo.name);
                setActivePlan(active?.id || 0);
                return;
            }
        }
        setActivePlan(0);
    }, [userSubscription]);

    const handleChoosePlan = async (plan) => {
        try {
            dispatch(ShowLoading());
            setLoading(true);

            if (activePlan === plan.id) {
                toast.success("You are already on this plan!");
                return;
            }

            const activeSub = userSubscription?.subscriptions?.find(sub => sub.status === "active");

            if (plan.id === 0) {
                setActivePlan(0);
                toast.success("You have switched to the Free Plan.");
                return;
            }

            if (!activeSub) {
                const response = await stripeService.createCheckoutSession({ priceId: plan.priceId });
                if (response?.url) window.location.href = response.url;
                return;
            }

            if (activeSub.planInfo.priceId === plan.priceId) {
                setActivePlan(plan.id);
                toast.success("You are already subscribed to this plan!");
                return;
            }

            const response = await stripeService.updateSubscription({ newPriceId: plan.priceId });
            toast.success("Subscription updated successfully!");
            await fetchSubscription();
            setActivePlan(plan.id);

        } catch (error) {
            console.error("Subscription error:", error);
            toast.error(error?.response?.data?.error || "Failed to process subscription");
        } finally {
            setLoading(false);
            dispatch(HideLoading());
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <ServicesHeader />

            <div className="text-3xl font-bold text-center mt-10 mb-3 text-gray-800">
                Choose Your Plan
            </div>

            <div className="flex flex-wrap justify-center gap-6">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className={`w-72 bg-white p-6 rounded-2xl shadow-md transition-all duration-300 border-2 cursor-pointer ${activePlan === plan.id ? "border-[#5E50BF]" : "border-gray-300"} hover:scale-105`}
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">{plan.name}</h2>
                        <p className="text-lg text-gray-600 mb-4">{plan.price}</p>
                        <ul className="text-gray-600 space-y-1 mb-6">
                            {plan.features.map((feature, index) => (
                                <li key={index}>• {feature}</li>
                            ))}
                        </ul>
                        <button
                            onClick={() => handleChoosePlan(plan)}
                            disabled={loading}
                            className={`w-full py-2 rounded-lg font-medium text-white transition-all duration-300 ${activePlan === plan.id ? "bg-[#5E50BF]" : "bg-gray-500 hover:bg-[#5E50BF]"}`}
                        >
                            {loading ? "Processing..." : "Choose Plan"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Plans;
