import React from "react";
import { FaEye } from "react-icons/fa";

const BookingsTable = ({ bookings, onView }) => {
    return (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full border-collapse">
                <thead>
                    <tr className="bg-[#E8E9EE] h-[64px] text-left">
                        <th className="text-sm font-bold text-center px-6 py-3">Service Provider</th>
                        <th className="text-sm font-bold text-center px-6 py-3">Service</th>
                        <th className="text-sm font-bold text-center px-6 py-3">Date</th>
                        <th className="text-sm font-bold text-center px-6 py-3">Status</th>
                        <th className="text-sm font-bold text-center px-6 py-3">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {bookings.map((booking) => (
                        <tr
                            key={booking._id}
                            className="border-b border-[#E8E9EE] h-[80px] last:border-none bg-white"
                        >
                            <td className="text-center text-[13px] px-6 py-2">
                                {booking?.serviceProvider?.name || "N/A"}
                            </td>
                            <td className="text-center text-[13px] px-6 py-2">
                                {booking?.service_id?.name || "N/A"}
                            </td>
                            <td className="text-center text-[13px] px-6 py-2">
                                {booking?.startDate || "N/A"}
                            </td>
                            <td className="text-center text-[13px] px-6 py-2">
                                <span
                                    className={`p-[6px] px-5 text-white rounded-4xl ${booking?.status === "Approved"
                                        ? "bg-[#02A847]"
                                        : booking?.status === "Pending"
                                            ? "bg-[#FF9E58]"
                                            : booking?.status === "Rejected"
                                                ? "bg-[#EF3826]"
                                                : "bg-gray-400"
                                        }`}
                                >
                                    {booking?.status || "N/A"}
                                </span>
                            </td>
                            <td className="text-center px-6 py-2">
                                <button
                                    onClick={() => onView(booking)}
                                    className="border cursor-pointer border-[#D5D5D5] px-[15.8px] py-[8.17px] rounded-[7.69px]"
                                >
                                    <FaEye fontSize={14} color="#0E1E40" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingsTable;
