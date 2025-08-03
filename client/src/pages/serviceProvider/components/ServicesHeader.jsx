import React, { useEffect, useRef, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { CiBellOn, CiSettings } from 'react-icons/ci';
import { IoMdCard } from 'react-icons/io';
import { MdOutlineLogout } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import profile from '../../../assets/images/profile.png';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import { setLoggedOut } from '../../../redux/logoutSlice';
import { clearUser, fetchUserInfo } from '../../../redux/userSlice';
import userService from '../../../services/userService';
import toast from 'react-hot-toast';
import CustomModal from '../../../components/CustomModal/CustomModal';
import UserProfile from '../../../components/Profile/UserProfile';
import ServiceProviderProfile from '../../../components/Profile/ServiceProviderProfile';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ServicesHeader = ({ title }) => {
    const user = useSelector((state) => state.user.user);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const profileDropdownRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate()

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

    const handleToggle = async (online) => {
        try {
            dispatch(ShowLoading());
            await userService.updateUserInfo({ isOnline: !online });
            toast.success("Status Updated Successfully");
            dispatch(fetchUserInfo());
            dispatch(HideLoading());
        }
        catch (error) {
            console.error("Error toggling service:", error);
            toast.error("Failed to toggle service");
        } finally {
            dispatch(HideLoading());
        }
    }


    return (
        <div>
            <header className="flex flex-col lg:flex-row justify-between min-h-[95px] items-center py-2 px-6 rounded-3xl bg-white">

                <h3 className='text-[23px] font-bold text-[#0E1E40]'>{title}</h3>

                <div className="flex space-x-4 items-center">
                    <div className='flex justify-center items-center h-[79.96px]'>
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={user.isOnline}
                                onChange={() => handleToggle(user.isOnline)}
                            />
                            <div className="w-12 h-6 bg-gray-200 rounded-full peer-focus:outline-none peer-checked:bg-[#5E50BF] relative transition-colors duration-200">
                                <span
                                    className={`absolute top-0.5 left-[3px] w-5 h-5 bg-white rounded-full transform transition-transform duration-200
                                    ${user.isOnline ? 'translate-x-5' : ''}`}
                                ></span>
                            </div>
                        </label>
                    </div>

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
                                    <li onClick={() => { setIsOpen(true); setIsProfileOpen(false) }} className="py-1 text-sm cursor-pointer flex items-center"><CgProfile className='mr-2' />Profile</li>
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

            <CustomModal isOpen={isOpen} width='500px' onRequestClose={() => setIsOpen(false)}>
                <div className=" p-8">

                    <h1 className="text-[30px] font-bold text-center">Edit Profile</h1>
                    <p className=" text-[12px] text-[#858FAD] text-center">
                        Enter your details to continue
                    </p>

                    {user.role === 'user' ? <UserProfile setIsOpen={setIsOpen} /> : <ServiceProviderProfile setIsOpen={setIsOpen} />}
                </div>
            </CustomModal>
        </div>
    )
}

export default ServicesHeader