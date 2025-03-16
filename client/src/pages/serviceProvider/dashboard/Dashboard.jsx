import React, { useEffect, useRef, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { CiBellOn, CiSettings } from 'react-icons/ci';
import { IoMdCard } from 'react-icons/io';
import { MdOutlineLogout } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import profile from '../../../assets/images/profile.png';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import { setLoggedOut } from '../../../redux/logoutSlice';
import { clearUser } from '../../../redux/userSlice';
import userService from '../../../services/userService';
import NewBookings from './components/NewBookings';
import TotalRevenue from './components/TotalRevenue';
import TodayBookings from './components/TodayBookings';

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    dispatch(ShowLoading());
    try {
      await userService.logoutUser({});
      Cookies.remove('parlor-jwt-token');
      dispatch(setLoggedOut());
      dispatch(clearUser());
    } catch (error) {
      message.error(error.response.data);
    }
    dispatch(HideLoading());
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleProfileDropdown = () => {
    setIsProfileOpen((prev) => !prev);
  };


  return (
    <div>
      <header className="flex flex-col lg:flex-row justify-between min-h-[95px] items-center py-2 px-6 rounded-3xl bg-white">

        <h3 className='text-[23px] font-bold text-[#0E1E40]'>Dashboard</h3>

        <div className="flex space-x-4 items-center">

          <div className='bg-white rounded-full h-[50px] w-[50px] flex items-center justify-center shadow'>
            <CiBellOn fontSize={24} />
          </div>

          <div className="relative" ref={profileDropdownRef}>
            <img
              src={user?.image ? `http://localhost:5777/static/images/${user.image}` : profile}
              alt="Profile"
              className="w-[60px] min-h-[60px] object-cover rounded-full border-[2px] border-[#858FAD] cursor-pointer"
              onClick={toggleProfileDropdown}
            />

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-[200px] bg-white border border-gray-200 rounded shadow-lg p-4 z-50">
                <p className="font-bold mb-2">My Account</p>
                <ul>
                  <li className="py-1 text-sm cursor-pointer flex items-center"><CgProfile className='mr-2' />Profile</li>
                  <li className="py-1 text-sm cursor-pointer flex items-center"><IoMdCard className='mr-2' />Billing</li>
                  <li className="py-1 text-sm cursor-pointer flex items-center"><CiSettings className='mr-2' />Settings</li>
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

      <div className='flex w-full mt-[35px] '>
        <div className='md:mr-[35px] lg:mr-[51px] w-full'>
          <div className=''>
            <TotalRevenue />
          </div>

          <div className=''>
            <TodayBookings />
          </div>
        </div>

        <div className='px-[23px] py-[25px] h-fit rounded-[9.35px] bg-white'>
          <h4 className='text-[17.74px] font-bold'>New bookings</h4>
          <NewBookings />
        </div>
      </div>
    </div>
  )
}

export default Dashboard