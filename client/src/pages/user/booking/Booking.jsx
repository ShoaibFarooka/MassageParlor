import React, { useEffect, useRef, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css'; // Optional for custom styling
import profile from '../../../assets/images/profile.png'
import { FaSearch, FaSlidersH } from 'react-icons/fa'
import { CiBellOn } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoMdCard } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { MdOutlineLogout } from "react-icons/md";
import userService from '../../../services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedOut } from '../../../redux/logoutSlice';
import { clearUser } from '../../../redux/userSlice';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import Cookies from 'js-cookie';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import bookingService from '../../../services/bookingService';
import CustomModal from '../../../components/CustomModal/CustomModal';
import UserProfile from '../../../components/Profile/UserProfile';
import ServiceProviderProfile from '../../../components/Profile/ServiceProviderProfile';

const CustomToolbar = ({ label, onNavigate, onView, view }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg ">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onNavigate("TODAY")}
          className="text-sm font-medium text-[#0E1E40]"
        >
          Today
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => onNavigate("PREV")}
          className=" cursor-pointer"
        >
          <FaChevronLeft />
        </button>

        <span className="text-lg font-bold text-gray-800">{label}</span>

        <button
          onClick={() => onNavigate("NEXT")}
          className=" cursor-pointer"
        >
          <FaChevronRight />
        </button>
      </div>

      <div className="flex rounded-xl border border-[#979797]">
        {["day", "week", "month"].map((v) => (
          <button
            key={v}
            onClick={() => onView(v)}
            className={`px-4 py-2 cursor-pointer text-sm font-medium transition-all ${v === 'week' ? 'border-l border-r border-[#979797]' : ''} ${v === 'day' && 'rounded-l-xl'} ${v === 'month' && 'rounded-r-xl'} ${view === v ? "bg-[#5E50BF] text-white" : "bg-transparent text-black"
              }`}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

const localizer = momentLocalizer(moment);

const UserBooking = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [height, setHeight] = useState(165);
  const minVal = 100;
  const maxVal = 200;
  const fillPercentage = ((height - minVal) / (maxVal - minVal)) * 100;
  // New dropdown state & ref for the profile image
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }

      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    dispatch(ShowLoading());
    try {
      await userService.logoutUser({});
      Cookies.remove('parlor-jwt-token');
      dispatch(setLoggedOut());
      dispatch(clearUser());
    } catch (error) {
      message.error(error.response.data);
    } finally {
      dispatch(HideLoading());
    }
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("month");
  const [events, setEvents] = useState([]);

  const parseTime = (timeString) => {
    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return { hours, minutes };
  };

  const colorNameToRGB = {
    Red: [255, 0, 0],
    Green: [0, 128, 0],
    Blue: [0, 0, 255],
    Purple: [128, 0, 128],
    // Add more color mappings as needed
  };


  const getRGBAColor = (colorName, opacity = 0.5) => {
    const rgb = colorNameToRGB[colorName];
    if (rgb) {
      return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
    }
    // Fallback to a default color if the name isn't found
    return `rgba(0, 0, 0, ${opacity})`;
  };

  const getBookingData = async () => {
    dispatch(ShowLoading());
    try {
      const response = await bookingService.getBookingsByUserId(user?._id);
      const formattedEvents = response.map((booking) => {
        const startDate = new Date(booking.startDate);
        const startTime = parseTime(booking.startTime);
        const endTime = parseTime(booking.endTime);

        return {
          id: booking._id,
          title: booking.service_id?.name,
          start: new Date(startDate.setHours(startTime.hours, startTime.minutes)),
          end: new Date(startDate.setHours(endTime.hours, endTime.minutes)),
          color: booking?.service_id?.calendarColor,
          status: booking.status,
        };
      });

      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      dispatch(HideLoading());
    }
  };


  useEffect(() => {
    getBookingData();
  }, [user?._id]);

  return (
    <div>
      <header className="flex flex-col lg:flex-row justify-between items-center py-2">

        <div className="flex items-center pb-4 lg:pb-0 justify-center space-x-4 w-full md:w-auto">
        </div>

        <div className="flex space-x-4 items-center">
          <div className='bg-white rounded-full h-[50px] w-[50px] flex items-center justify-center shadow'>
            <CiBellOn fontSize={24} />
          </div>

          <div className="relative" ref={profileDropdownRef}>
            {user?.image ? <img
              src={`http://localhost:5777/static/images/${user.image}`}
              alt="Profile"
              className="w-[60px] h-[60px] object-cover rounded-full border-[2px] border-[#858FAD] cursor-pointer"
              onClick={toggleProfileDropdown}
            /> :
              (
                <div onClick={toggleProfileDropdown} className='bg-white rounded-full h-[60px] w-[60px] flex items-center justify-center shadow cursor-pointer'>
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
                  <li onClick={() => { setIsEditProfileOpen(true); setIsProfileOpen(false) }} className="py-1 text-sm cursor-pointer flex items-center  hover:bg-[#F3F2F8]"><CgProfile className='mr-2' /> Profile</li>
                  <li className="py-1 text-sm cursor-pointer flex items-center hover:bg-[#F3F2F8]"><IoMdCard className='mr-2' />Billing</li>
                  <li className="py-1 text-sm cursor-pointer flex items-center hover:bg-[#F3F2F8]"><CiSettings className='mr-2' />Settings</li>
                  <li onClick={handleLogout} className="py-1 text-sm cursor-pointer flex items-center hover:bg-[#F3F2F8] text-red-500">
                    <MdOutlineLogout className='mr-2' />
                    Log out
                  </li>
                </ul>
              </div>
            )}
          </div>

        </div>
      </header>

      <div className="bg-white shadow-md rounded-md my-6 p-6">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700, border: "none" }}
          className="border rounded-md"
          eventPropGetter={(event) => {
            const isPending = event.status === "Pending";

            if (event.color) {
              return {
                style: {
                  backgroundColor: `${getRGBAColor(event.color, 0.5)}`,
                  color: "black",
                  borderTop: '0px',
                  borderRight: '0px',
                  borderBottom: '0px',
                  borderRadius: "10px",
                  borderLeft: `10px solid ${event.color}`,
                  padding: "5px",
                  opacity: isPending ? 0.5 : 1,
                },
              };
            }

            // Return an empty style object for events without a color
            return {};
          }}


          date={currentDate}
          onNavigate={(newDate) => {
            // newDate is the date RBC wants to show after Next/Prev/Today
            setCurrentDate(newDate);
          }}
          view={currentView}
          onView={(view) => setCurrentView(view)}
          components={{
            toolbar: (props) => <CustomToolbar {...props} view={currentView} />,
          }}
        />

      </div>

      <CustomModal isOpen={isEditProfileOpen} width='500px' onRequestClose={() => setIsEditProfileOpen(false)}>
        <div className=" p-8">
          <h1 className="text-[30px] font-bold text-center">Edit Profile</h1>
          <p className=" text-[12px] text-[#858FAD] text-center">
            Enter your details to continue
          </p>

          {user.role === 'user' ? <UserProfile setIsEditProfileOpen={setIsEditProfileOpen} /> : <ServiceProviderProfile />}
        </div>
      </CustomModal>
    </div>
  );
};

export default UserBooking;
