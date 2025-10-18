import React from "react";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const BookingsTable = ({ bookings, onView, onDelete }) => {
    return (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full">
                <thead>
                    <tr className="bg-[#E8E9EE] h-[64px]">
                        <th className="text-sm font-bold text-center md:whitespace-nowrap whitespace-normal pl-6">Service</th>
                        <th className="text-sm font-bold text-center md:whitespace-nowrap whitespace-normal">Service Provider</th>
                        <th className="text-sm font-bold text-center md:whitespace-nowrap whitespace-normal">Date</th>
                        <th className="text-sm font-bold text-center md:whitespace-nowrap whitespace-normal">Status</th>
                        <th className="text-sm font-bold text-center md:whitespace-nowrap whitespace-normal pr-6">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking._id} className="border-b border-[#E8E9EE] h-[79.96px] last:border-none bg-white">
                            <td className="text-start text-[12px] pl-6">{booking?.service_id?.name}</td>
                            <td className="text-center text-[12px]">{booking?.serviceProvider?.name}</td>
                            <td className="text-center text-[12px]">{booking?.startDate}</td>
                            <td className="text-center text-[12px]">
                                <span className={`p-[6px] px-5 text-white w-fit mx-auto rounded-4xl ${booking?.status === "Approved"
                                    ? "bg-[#02A847]"
                                    : booking?.status === "Pending"
                                        ? "bg-[#FF9E58]"
                                        : booking?.status === "Rejected"
                                            ? "bg-[#EF3826]"
                                            : "bg-gray-400"
                                    }`}>
                                    {booking?.status}
                                </span>
                            </td>
                            <td className="flex justify-center items-center h-[79.96px] pr-6">
                                <button
                                    onClick={() => onView(booking)}
                                    className="border cursor-pointer border-[#D5D5D5] px-[15.8px] py-[8.17px] rounded-l-[7.69px]"
                                >
                                    <FaEye fontSize={14} color="#0E1E40" />
                                </button>

                                <button
                                    onClick={() => onDelete(booking)}
                                    className="border cursor-pointer border-[#D5D5D5] px-[15.8px] py-[8.17px] border-l-0 rounded-r-[7.69px]"
                                >
                                    <RiDeleteBin6Line fontSize={14} color="#EF3826" />
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
