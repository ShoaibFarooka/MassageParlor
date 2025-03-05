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

const CustomToolbar = ({ label, onNavigate, onView, view }) => {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg ">
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
  const [events, setEvents] = useState([
    {
      title: 'Another Person',
      start: new Date(2025, 2, 2),
      end: new Date(2025, 2, 5),
      color: '#6B46C1' // Purple
    },
    {
      title: 'Weekend Festival',
      start: new Date(2025, 2, 6),
      end: new Date(2025, 2, 6),
      color: '#D53F8C' // Pink
    },
    {
      title: 'Training',
      start: new Date(2025, 2, 4),
      end: new Date(2025, 2, 4),
      color: '#3182CE' // Blue
    },
    {
      title: 'Some Booking',
      start: new Date(2025, 2, 6),
      end: new Date(2025, 2, 8),
      color: '#DD6B20' // Orange
    }
  ]);


  return (
    <div>
      <header className="flex flex-col lg:flex-row justify-between items-center py-2">

        <div className="flex items-center pb-4 lg:pb-0 justify-center space-x-4 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-6 pr-4 py-2 text-lg rounded-full h-[56px] w-[220px] sm:w-[400px] bg-white shadow outline-0"
            />

            <FaSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-black " fontSize={24} />
          </div>

          <div className='relative'>
            <button
              onClick={toggleDropdown}
              className="p-2 rounded-full bg-white h-[50px] w-[50px] flex justify-center items-center cursor-pointer shadow"
            >
              <FaSlidersH className="text-black" fontSize={24} />
            </button>
            {isOpen && (
              <div ref={dropdownRef} className="absolute right-0 w-[234px] mt-2 rounded-2xl shadow-lg bg-white z-50">
                <h2 className="text-base font-semibold mb-4 mt-4 text-center">Filters</h2>

                <div className='px-4'>
                  <div className="mb-2">
                    <label className="block text-[10px] font-medium ">Location</label>
                    <input
                      type="text"
                      className="w-full h-[30px] text-[10px] border-none outline-0 rounded-lg mt-2 p-2 bg-[#F3F2F8]"
                      placeholder="Enter value"
                    />
                  </div>

                  <div className="mb-2">
                    <label className="block text-[10px] font-medium ">Ethnicity</label>
                    <select className="w-full h-[30px] text-[10px] border-none outline-0 rounded-lg mt-2 p-2 bg-[#F3F2F8]">
                      <option>Value 1</option>
                      <option>Value 2</option>
                      <option>Value 3</option>
                    </select>
                  </div>

                  <div className="mb-2">
                    <label className="block text-[10px] font-medium ">Location</label>
                    <div className='flex mt-2'>
                      <span className='w-4 h-4 bg-[#DCC792] rounded-full mr-[10px] cursor-pointer'></span>
                      <span className='w-4 h-4 bg-[#824238] rounded-full mr-[10px] cursor-pointer'></span>
                      <span className='w-4 h-4 bg-[#000000] rounded-full mr-[10px] cursor-pointer'></span>
                      <span className='w-4 h-4 bg-[#80624E] rounded-full mr-[10px] cursor-pointer'></span>
                    </div>
                  </div>

                  <div className="mb-2">
                    <label className="block text-[10px] font-medium ">Height - ({height}cm)</label>
                    <div className=' mt-2'>
                      <input
                        type="range"
                        min={minVal}
                        max={maxVal}
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="range-slider w-full"
                        style={{
                          background: `linear-gradient(to right, #000 0%, #000 ${fillPercentage}%, #ddd ${fillPercentage}%, #ddd 100%)`
                        }}
                      />
                    </div>
                  </div>
                </div>

                <button className='text-sm font-semibold rounded-b-3xl mt-2 text-white bg-[#5E50BF] py-3 w-full'>
                  Filter
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex space-x-4 items-center">

          <div className='flex items-center space-x-2 border border-[#858FAD] rounded-[12px] px-4 py-2'>
            <IoLocationOutline fontSize={24} className='p-0 m-0' />

            <div className='flex flex-col pl-3 sm:pl-6'>
              <span className='text-[11px] font-semibold'>
                Location
              </span>

              <span className='text-sm font-semibold text-[#858FAD]'>
                Brooklyn
              </span>
            </div>
          </div>

          <div className='bg-white rounded-full h-[50px] w-[50px] flex items-center justify-center shadow'>
            <CiBellOn fontSize={24} />
          </div>

          <div className="relative" ref={profileDropdownRef}>
            <img
              src={`http://localhost:5777/static/images/${user.image}` || profile}
              alt="Profile"
              className="w-[60px] min-h-[60px] object-cover rounded-full border-[2px] border-[#858FAD] cursor-pointer"
              onClick={toggleProfileDropdown}
            />
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-[200px] bg-white border border-gray-200 rounded shadow-lg p-4 z-50">
                <p className="font-bold mb-2">My Account</p>
                <ul>
                  <li className="py-1 text-sm cursor-pointer flex items-center"><CgProfile className='mr-2' /> Profile</li>
                  <li className="py-1 text-sm cursor-pointer flex items-center"><IoMdCard className='mr-2' />                                        Billing</li>
                  <li className="py-1 text-sm cursor-pointer flex items-center"><CiSettings className='mr-2' />                                        Settings</li>
                  <li onClick={handleLogout} className="py-1 text-sm cursor-pointer flex items-center text-red-500">
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
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.color || "#5E50BF",
              color: "#fff",
              borderRadius: "8px",
              border: "none",
              padding: "5px",
            },
          })}
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
    </div>
  );
};

export default UserBooking;
