import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../../redux/loaderSlice";
import { message } from "antd";
import subscriptionService from "../../../services/subscriptionService";

const Success = () => {
    const dispatch = useDispatch();
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        let attempts = 0;
        const MAX_ATTEMPTS = 10;

        dispatch(ShowLoading());

        const interval = setInterval(async () => {
            attempts += 1;

            try {
                const response = await subscriptionService.checkPaymentStatus();

                if (response?.success && response?.data?.isVerified) {
                    setIsVerified(true);
                    clearInterval(interval);
                    dispatch(HideLoading());
                    message.success("Payment verified successfully!");
                } else if (attempts >= MAX_ATTEMPTS) {
                    clearInterval(interval);
                    dispatch(HideLoading());
                    message.error(
                        "Payment verification timed out. Please refresh or try again."
                    );
                }
            } catch (error) {
                console.error("Verification error:", error);
                clearInterval(interval);
                dispatch(HideLoading());
                message.error("An error occurred during verification. Please try again.");
            }
        }, 3000);

        return () => {
            clearInterval(interval);
            dispatch(HideLoading());
        };
    }, [dispatch]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6">
            {!isVerified ? (
                <>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                        Verifying your payment...
                    </h2>
                    <p className="text-gray-500 mb-2">
                        Please wait while we confirm your payment with Stripe.
                    </p>
                    <p className="text-sm text-gray-400">
                        This may take a few seconds.
                    </p>
                </>
            ) : (
                <div>
                    <h2 className="text-2xl font-semibold text-green-600 mb-2">
                        Payment Successful 🎉
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Your subscription is now active. Thank you!
                    </p>
                    <button
                        onClick={() => (window.location.href = "/service/dashboard")}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Go to Dashboard
                    </button>
                </div>
            )}
        </div>
    );
};

export default Success;
