import React, { useEffect, useRef, useState } from 'react'
import profile from '../../../assets/images/profile.png'
import { FaSearch, FaSlidersH } from 'react-icons/fa'
import ServiceCard from '../../../components/serviceProvider/ServiceCard';
import { CiBellOn } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoMdCard } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { MdOutlineLogout } from "react-icons/md";
import userService from '../../../services/userService';
import { useDispatch } from 'react-redux';
import { setLoggedOut } from '../../../redux/logoutSlice';
import { clearUser } from '../../../redux/userSlice';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import Cookies from 'js-cookie';


const providers = [
];

const UserHome = () => {
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
    const [serviceProviders, setServiceProviders] = useState([]);
    const [filters, setFilters] = useState({
        searchQuery: "",
        location: "",
        ethnicity: "",
        hairColor: "",
        minHeight: "",
        maxHeight: "",
        callOutType: "",
    });

    const fetchServiceProviders = async () => {
        dispatch(ShowLoading());
        try {
            const response = await userService.searchServiceProviders(filters);
            let fetchedProviders = response.result.users;

            // Add static data to the response if missing
            fetchedProviders = fetchedProviders.map((provider) => ({
                ...provider,
                age: provider.age || 25,
                years: provider.years || 3,
                clients: provider.clients || 24,
                specialization: provider.specialization || "Specializes in Hot Stone and Sports massage.",
                image: provider.image ? `http://localhost:5777/static/images/${provider.image}` : profile,
            }));

            setServiceProviders(fetchedProviders);
        } catch (error) {
            console.error("Error fetching service providers:", error);
            setServiceProviders([]);
        }
        dispatch(HideLoading());
    };

    useEffect(() => {
        fetchServiceProviders();
    }, []);

    const handleFilterChange = (e) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [e.target.name]: e.target.value,
        }));
    };


    const applyFilters = async () => {
        dispatch(ShowLoading());
        try {
            const response = await userService.searchServiceProviders(filters);
            let fetchedProviders = response.result.users;

            // Apply filters on the frontend in case backend filtering is incomplete
            fetchedProviders = fetchedProviders.filter((provider) => {
                return (
                    (!filters.location || provider.location?.toLowerCase().includes(filters.location.toLowerCase())) &&
                    (!filters.ethnicity || provider.ethnicity === filters.ethnicity) &&
                    (!filters.hairColor || provider.hairColor === filters.hairColor) &&
                    (!filters.minHeight || parseInt(provider.height) >= parseInt(filters.minHeight)) &&
                    (!filters.maxHeight || parseInt(provider.height) <= parseInt(filters.maxHeight)) &&
                    (!filters.callOutType || provider.callOutType === filters.callOutType)
                );
            });

            setServiceProviders(fetchedProviders);
        } catch (error) {
            console.error("Error fetching filtered service providers:", error);
        }
        dispatch(HideLoading());
    };



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
        }
        dispatch(HideLoading());
    };

    console.log(serviceProviders, 'serviceProviders')

    return (
        <div>
            <div className="min-h-screen">
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
                                                name="location"
                                                value={filters.location}
                                                onChange={handleFilterChange}
                                                className="w-full h-[30px] text-[10px] border-none outline-0 rounded-lg mt-2 p-2 bg-[#F3F2F8]"
                                                placeholder="Enter location"
                                            />
                                        </div>

                                        <div className="mb-2">
                                            <label className="block text-[10px] font-medium ">Ethnicity</label>
                                            <select
                                                name="ethnicity"
                                                value={filters.ethnicity}
                                                onChange={handleFilterChange}
                                                className="w-full h-[30px] text-[10px] border-none outline-0 rounded-lg mt-2 p-2 bg-[#F3F2F8]"
                                            >
                                                <option value="">All</option>
                                                <option value="Black">Black</option>
                                                <option value="White">White</option>
                                                <option value="Asian">Asian</option>
                                                <option value="Hispanic">Hispanic</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>

                                        <div className="mb-2">
                                            <label className="block text-[10px] font-medium">Hair Color</label>
                                            <div className="flex mt-2">
                                                {["Blonde", "Brown", "Black", "Red"].map((color, index) => (
                                                    <span
                                                        key={index}
                                                        className={`w-4 h-4 rounded-full mr-[10px] cursor-pointer ${filters.hairColor === color ? "border-2 border-black" : ""}`}
                                                        style={{ backgroundColor: color }}
                                                        onClick={() => setFilters((prev) => ({ ...prev, hairColor: color }))}
                                                    ></span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mb-2">
                                            <label className="block text-[10px] font-medium">Height - ({height}cm)</label>
                                            <div className="mt-2">
                                                <input
                                                    type="range"
                                                    min={minVal}
                                                    max={maxVal}
                                                    value={height}
                                                    onChange={(e) => {
                                                        const newHeight = e.target.value;
                                                        setHeight(newHeight);
                                                        setFilters((prev) => ({ ...prev, minHeight: newHeight }));
                                                    }}
                                                    className="range-slider w-full"
                                                    style={{
                                                        background: `linear-gradient(to right, #000 0%, #000 ${fillPercentage}%, #ddd ${fillPercentage}%, #ddd 100%)`,
                                                    }}
                                                />
                                            </div>
                                        </div>

                                    </div>

                                    <button onClick={applyFilters} className='text-sm cursor-pointer font-semibold rounded-b-3xl mt-2 text-white bg-[#5E50BF] py-3 w-full'>
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
                                src={profile}
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

                <main className="py-16">
                    <div className="grid grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {serviceProviders.length > 0 ? (
                            serviceProviders.map((provider) => (
                                <ServiceCard key={provider._id} provider={provider} />
                            ))
                        ) : (
                            <p className="text-center col-span-3">No service providers found.</p>
                        )}

                    </div>
                </main>
            </div>
        </div>
    )
}

export default UserHome