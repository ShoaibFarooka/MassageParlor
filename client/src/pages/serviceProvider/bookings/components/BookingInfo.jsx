import React from "react";

const BookingInfo = ({ booking, onApprove, onReject }) => {
    if (!booking) return null;

    const calculateAge = (dob) => {
        if (!dob) return null;
        const birthDate = new Date(dob);
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    const { user_id, service_id, serviceProvider, startDate, status } = booking;

    const statusColor = status === "Approved"
        ? "bg-green-500"
        : status === "Pending"
            ? "bg-orange-500"
            : status === "Rejected"
                ? "bg-red-500"
                : "bg-gray-400";

    return (
        <div className="p-10 space-y-6 w-full">
            <div className="border rounded-lg p-4 shadow-sm bg-white w-full">
                <h3 className="text-lg font-semibold mb-2 border-b pb-1 text-left">User Information</h3>
                <div className="text-sm text-gray-700 space-y-1 text-left">
                    <p><strong>Name:</strong> {user_id?.name}</p>
                    <p><strong>Email:</strong> {user_id?.email}</p>
                    <p><strong>Mobile:</strong> {user_id?.number}</p>
                    <p><strong>Date of Birth:</strong> {user_id?.dateOfBirth}</p>
                </div>
            </div>

            <div className="border rounded-lg p-4 shadow-sm bg-white w-full">
                <h3 className="text-lg font-semibold mb-2 border-b pb-1 text-left">Service Information</h3>
                <div className="text-sm text-gray-700 space-y-1 text-left">
                    <p><strong>Service Name:</strong> {service_id?.name}</p>
                    <p><strong>Description:</strong> {service_id?.description}</p>
                    <p><strong>Booking Date:</strong> {startDate}</p>
                    <p>
                        <strong>Status:</strong>
                        <span className={`ml-2 px-2 py-1 rounded-full text-white text-xs ${statusColor}`}>
                            {status}
                        </span>
                    </p>
                </div>
            </div>

            <div className="border rounded-lg p-4 shadow-sm bg-white w-full">
                <h3 className="text-lg font-semibold mb-2 border-b pb-1 text-left">Service Provider Information</h3>
                <div className="text-sm text-gray-700 space-y-1 text-left">
                    <p><strong>Name:</strong> {serviceProvider?.name}</p>
                    <p><strong>Gender:</strong> {serviceProvider?.gender}</p>
                    <p><strong>Age:</strong> {calculateAge(serviceProvider.dateOfBirth)}</p>
                    <p><strong>Email:</strong> {serviceProvider?.email}</p>
                    <p><strong>Mobile:</strong> {serviceProvider?.number}</p>
                </div>
            </div>

            <div className="flex justify-start gap-4 mt-4">
                {status !== "Approved" && (
                    <button
                        onClick={onApprove}
                        className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                    >
                        Approve
                    </button>
                )}
                <button
                    onClick={onReject}
                    className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                >
                    Reject
                </button>
            </div>
        </div>
    );
};

export default BookingInfo;
