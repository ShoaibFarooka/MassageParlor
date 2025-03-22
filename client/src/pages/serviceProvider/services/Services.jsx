import React, { useEffect, useRef, useState } from 'react'
import { CgProfile } from 'react-icons/cg';
import { CiBellOn, CiSettings } from 'react-icons/ci';
import { IoMdCard } from 'react-icons/io';
import { MdOutlineLogout } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import profile from '../../../assets/images/profile.png'
import ServiceTable from './components/ServicesTable';
import CreateService from './components/CreateService';
import userService from '../../../services/userService';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import { setLoggedOut } from '../../../redux/logoutSlice';
import { clearUser } from '../../../redux/userSlice';
import ServicesHeader from '../components/ServicesHeader';

const Services = () => {
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
    <div className=''>
      <ServicesHeader title={'Services'} />

      <button onClick={() => setIsOpen(true)} className='w-[203px] ml-auto flex justify-center items-center cursor-pointer my-6 font-semibold bg-[#5E50BF] text-white rounded-full rounded-tr-none h-[52px]'>Add Service</button>

      <ServiceTable />

      <CreateService isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}

export default Services