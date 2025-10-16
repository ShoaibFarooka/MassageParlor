import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../../redux/loaderSlice";
import { setLoggedOut } from "../../../redux/logoutSlice";
import { clearUser } from "../../../redux/userSlice";
import bookingService from "../../../services/bookingService";
import CustomModal from "../../../components/CustomModal/CustomModal";
import BookingInfo from "./components/BookingInfo";
import BookingsTable from "./components/BookingsTable";
import { CgProfile } from "react-icons/cg";
import { IoMdCard } from "react-icons/io";
import { CiSettings, CiBellOn } from "react-icons/ci";
import { MdOutlineLogout } from "react-icons/md";
import userService from "../../../services/userService";
import Cookies from "js-cookie";

function UserBookings() {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

    const profileDropdownRef = useRef(null);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const fetchBookings = async () => {
        try {
            dispatch(ShowLoading());
            const response = await bookingService.getBookingsByUserId(user._id);
            setBookings(response);
        } catch (error) {
            toast.error("Failed to fetch bookings");
            console.error(error);
        } finally {
            dispatch(HideLoading());
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    // Close profile dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleView = (booking) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };

    const toggleProfileDropdown = () => setIsProfileOpen((prev) => !prev);

    const handleLogout = async () => {
        dispatch(ShowLoading());
        try {
            await userService.logoutUser({});
            Cookies.remove("parlor-jwt-token");
            dispatch(setLoggedOut());
            dispatch(clearUser());
        } catch (error) {
            toast.error(error.response?.data || "Logout failed");
        } finally {
            dispatch(HideLoading());
        }
    };

    return (
        <div>
            {/* Header */}
            <header className="flex flex-col lg:flex-row justify-between items-center py-2">
                <div className="flex items-center pb-4 lg:pb-0 justify-center space-x-4 w-full md:w-auto"></div>

                <div className="flex space-x-4 items-center">
                    {/* Notification Icon */}
                    <div className="bg-white rounded-full h-[50px] w-[50px] flex items-center justify-center shadow">
                        <CiBellOn fontSize={24} />
                    </div>

                    {/* Profile Dropdown */}
                    <div className="relative" ref={profileDropdownRef}>
                        {user?.image ? (
                            <img
                                src={`http://localhost:5777/static/images/${user.image}`}
                                alt="Profile"
                                className="w-[60px] h-[60px] object-cover rounded-full border-[2px] border-[#858FAD] cursor-pointer"
                                onClick={toggleProfileDropdown}
                            />
                        ) : (
                            <div
                                onClick={toggleProfileDropdown}
                                className="bg-white rounded-full h-[60px] w-[60px] flex items-center justify-center shadow cursor-pointer"
                            >
                                <svg
                                    className="w-8 h-8 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                >
                                    <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4z" />
                                    <path d="M12 14c-4.42 0-8 1.79-8 4v1h16v-1c0-2.21-3.58-4-8-4z" />
                                </svg>
                            </div>
                        )}

                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-[200px] bg-white border border-gray-200 rounded shadow-lg p-4 z-50">
                                <p className="font-bold mb-2">My Account</p>
                                <ul>
                                    <li
                                        onClick={() => {
                                            setIsEditProfileOpen(true);
                                            setIsProfileOpen(false);
                                        }}
                                        className="py-1 text-sm cursor-pointer flex items-center hover:bg-[#F3F2F8]"
                                    >
                                        <CgProfile className="mr-2" /> Profile
                                    </li>
                                    <li className="py-1 text-sm cursor-pointer flex items-center hover:bg-[#F3F2F8]">
                                        <IoMdCard className="mr-2" /> Billing
                                    </li>
                                    <li className="py-1 text-sm cursor-pointer flex items-center hover:bg-[#F3F2F8]">
                                        <CiSettings className="mr-2" /> Settings
                                    </li>
                                    <li
                                        onClick={handleLogout}
                                        className="py-1 text-sm cursor-pointer flex items-center hover:bg-[#F3F2F8] text-red-500"
                                    >
                                        <MdOutlineLogout className="mr-2" /> Log out
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Bookings Table */}
            <BookingsTable bookings={bookings} onView={handleView} />

            {/* Booking Details Modal */}
            <CustomModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                title="Booking Details"
            >
                <BookingInfo booking={selectedBooking} />
            </CustomModal>
        </div>
    );
}

export default UserBookings;
