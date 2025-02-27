import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css'; // Optional for custom styling
import profile from '../../../assets/images/profile.png'
import { FaSearch, FaSlidersH } from 'react-icons/fa'
import { CiBellOn } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";

const localizer = momentLocalizer(moment);

const UserBooking = () => {
  // Sample booking events
  const [events, setEvents] = useState([
    {
      title: 'Another Person',
      start: new Date(2024, 9, 2), // Oct 2, 2024
      end: new Date(2024, 9, 2),
      color: 'bg-purple-300'
    },
    {
      title: 'Weekend Festival',
      start: new Date(2024, 9, 16), // Oct 16, 2024
      end: new Date(2024, 9, 16),
      color: 'bg-pink-300'
    },
    {
      title: 'Training',
      start: new Date(2024, 9, 24), // Oct 24, 2024
      end: new Date(2024, 9, 24),
      color: 'bg-blue-300'
    },
    {
      title: 'Some Booking',
      start: new Date(2024, 9, 26),
      end: new Date(2024, 9, 28),
      color: 'bg-orange-300'
    }
  ]);

  return (
    <div>
      <header className="flex justify-between items-center py-2 px-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-6 pr-4 py-2 text-lg rounded-full h-[56px] w-[400px] bg-white"
            />

            <FaSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-black" fontSize={24} />
          </div>

          <button
            className="p-2 rounded-full bg-white h-[50px] w-[50px] flex justify-center items-center cursor-pointer"
          >
            <FaSlidersH className="text-black" fontSize={24} />
          </button>
        </div>

        <div className="flex space-x-4 items-center">

          <div className='flex items-center space-x-2 border border-[#858FAD] rounded-[12px] px-4 py-2'>
            <IoLocationOutline fontSize={24} className='p-0 m-0' />

            <div className='flex flex-col pl-6'>
              <span className='text-[11px] font-semibold'>
                Location
              </span>

              <span className='text-sm font-semibold text-[#858FAD]'>
                Brooklyn
              </span>
            </div>
          </div>

          <div className='bg-white rounded-full h-[50px] w-[50px] flex items-center justify-center'>
            <CiBellOn fontSize={24} />
          </div>

          <img
            src={profile}
            alt={`Profile`}
            className="w-[60px] min-h-[60px] object-cover rounded-full border-[2px] border-[#858FAD]"
          />
        </div>
      </header>

      <div className="bg-white shadow-md rounded-md m-6 p-6">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500,border:'none' }}
          className="border rounded-md"
        />
      </div>
    </div>
  );
};

export default UserBooking;
