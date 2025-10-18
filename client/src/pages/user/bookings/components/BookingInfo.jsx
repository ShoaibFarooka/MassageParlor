import React from "react";

const BookingInfo = ({ booking }) => {
    if (!booking) return null;

    const calculateAge = (dob) => {
        if (!dob) return "N/A";

        const birthDate = new Date(dob);
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);

        return age === 0 ? "N/A" : age;
    };

    const formatDuration = (duration) => {
        if (duration == null) return "N/A";

        const hours = Math.floor(duration);
        const minutes = Math.round((duration - hours) * 60);

        let result = "";

        if (hours > 0) result += `${hours} hour${hours > 1 ? "s" : ""}`;
        if (minutes > 0) result += `${hours > 0 ? " " : ""}${minutes} minute${minutes > 1 ? "s" : ""}`;

        return result || "0 minutes";
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
                <h3 className="text-lg font-semibold mb-2 border-b pb-1 text-left">Service Information</h3>
                <div className="text-sm text-gray-700 space-y-1 text-left">
                    <p><strong>Service Name:</strong> {service_id?.name}</p>
                    <p><strong>Description:</strong> {service_id?.description}</p>
                    <p><strong>Duration:</strong> {formatDuration(service_id?.duration)}</p>
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
                    <p><strong>Gender:</strong> {serviceProvider?.gender || 'N/A'}</p>
                    <p>
                        <strong>Age:</strong>{' '}
                        {serviceProvider?.dateOfBirth ? calculateAge(serviceProvider.dateOfBirth) : 'N/A'}
                    </p>

                    <p><strong>Email:</strong> {serviceProvider?.email}</p>
                    <p><strong>Mobile:</strong> {serviceProvider?.number}</p>
                </div>
            </div>
        </div>
    );
};

export default BookingInfo;
