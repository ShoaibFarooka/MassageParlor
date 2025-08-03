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
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedOut } from '../../../redux/logoutSlice';
import { clearUser } from '../../../redux/userSlice';
import Cookies from 'js-cookie';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import CustomModal from '../../../components/CustomModal/CustomModal';
import UserProfile from '../../../components/Profile/UserProfile';
import ServiceProviderProfile from '../../../components/Profile/ServiceProviderProfile';


const providers = [
];

const UserHome = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [height, setHeight] = useState(165);
    const minVal = 100;
    const maxVal = 200;
    const fillPercentage = ((height - minVal) / (maxVal - minVal)) * 100;
    const user = useSelector((state) => state.user.user);

    console.log(user, 'user123')

    // New dropdown state & ref for the profile image
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileDropdownRef = useRef(null);
    const dispatch = useDispatch();
    const [serviceProviders, setServiceProviders] = useState([]);
    const debounceTimer = useRef(null);

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

            // Apply local filtering in case the API doesn't support it
            fetchedProviders = fetchedProviders.filter((provider) => {
                const searchQuery = filters.searchQuery.toLowerCase();
                return (
                    provider.name.toLowerCase().includes(searchQuery) ||
                    provider.location.toLowerCase().includes(searchQuery)
                );
            });

            // Add static data if missing
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
        // Clear the previous timer if the user types again
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        // Set a new timer that runs the API call after 500ms of inactivity
        debounceTimer.current = setTimeout(() => {
            fetchServiceProviders();
        }, 500);

        // Cleanup timer on unmount or when searchQuery changes
        return () => clearTimeout(debounceTimer.current);
    }, [filters.searchQuery]);


    const handleFilterChange = (e) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [e.target.name]: e.target.value,
        }));
    };


    const applyFilters = async () => {
        fetchServiceProviders()
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

    const clearFilters = () => {
        setFilters({
            searchQuery: "",
            location: "",
            ethnicity: "",
            hairColor: "",
            minHeight: "",
            maxHeight: "",
            callOutType: "",
        });
        setHeight(165); // Reset height slider to default
        fetchServiceProviders()
    };

    return (
        <div>
            <div className="min-h-screen">
                <header className="flex flex-col lg:flex-row justify-between items-center py-2">

                    <div className="flex items-center pb-4 lg:pb-0 justify-center space-x-4 w-full md:w-auto">
                        <div className="relative">
                            <input
                                type="text"
                                name="searchQuery"
                                value={filters.searchQuery}
                                onChange={handleFilterChange}
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
                                            <label className="block text-[12px] font-medium ">Location</label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={filters.location}
                                                onChange={handleFilterChange}
                                                className="w-full h-[30px] text-[12px] border-none outline-0 rounded-lg mt-2 p-2 bg-[#F3F2F8]"
                                                placeholder="Enter location"
                                            />
                                        </div>

                                        <div className="mb-2">
                                            <label className="block text-[12px] font-medium ">Ethnicity</label>
                                            <select
                                                name="ethnicity"
                                                value={filters.ethnicity}
                                                onChange={handleFilterChange}
                                                className="w-full h-[30px] text-[12px] border-none outline-0 rounded-lg mt-2 p-2 bg-[#F3F2F8]"
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
                                            <label className="block text-[12px] font-medium">Hair Color</label>
                                            <div className="flex mt-2">
                                                {["Blonde", "Brown", "Black", "Red"].map((color, index) => (
                                                    <span
                                                        key={index}
                                                        className={`w-5 h-5 rounded-full mr-[10px] cursor-pointer ${filters.hairColor === color ? "border-2 border-[#a3a0a0]" : ""}`}
                                                        style={{ backgroundColor: color }}
                                                        onClick={() => setFilters((prev) => ({ ...prev, hairColor: color }))}
                                                    ></span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mb-2">
                                            <label className="block text-[12px] font-medium">Height - ({height}cm)</label>
                                            <div className="mt-2">
                                                <input
                                                    type="range"
                                                    min={minVal}
                                                    max={maxVal}
                                                    value={height}
                                                    onChange={(e) => {
                                                        const newHeight = e.target.value;
                                                        setHeight(newHeight);
                                                        setFilters((prev) => ({ ...prev, maxHeight: newHeight }));
                                                    }}
                                                    className="range-slider w-full"
                                                    style={{
                                                        background: `linear-gradient(to right, #000 0%, #000 ${fillPercentage}%, #ddd ${fillPercentage}%, #ddd 100%)`,
                                                    }}
                                                />
                                            </div>
                                        </div>

                                    </div>

                                    <button
                                        onClick={clearFilters}
                                        className="text-sm cursor-pointer font-semibold mt-2 text-[#5E50BF] bg-white py-3 w-full border-t border-gray-200"
                                    >
                                        Clear Filters
                                    </button>

                                    <button onClick={applyFilters} className='text-sm cursor-pointer font-semibold rounded-b-3xl text-white bg-[#5E50BF] py-3 w-full'>
                                        Filter
                                    </button>
                                </div>
                            )}
                        </div>
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
                                        <li onClick={() => { setIsEditProfileOpen(true); setIsProfileOpen(false) }} className="py-1 hover:bg-[#F3F2F8] text-sm cursor-pointer flex items-center"><CgProfile className='mr-2' /> Profile</li>
                                        <li className="py-1 text-sm cursor-pointer flex items-center  hover:bg-[#F3F2F8]"><IoMdCard className='mr-2' />Billing</li>
                                        <li className="py-1 text-sm cursor-pointer flex items-center hover:bg-[#F3F2F8]"><CiSettings className='mr-2' />Settings</li>
                                        <li onClick={handleLogout} className="py-1 text-sm cursor-pointer flex items-center text-red-500 hover:bg-[#F3F2F8]">
                                            <MdOutlineLogout className='mr-2' />
                                            Log out
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                    </div>
                </header>

                <main className="flex justify-center items-center">
                    <div className="flex flex-wrap justify-center p-4 max-w-full">
                        {serviceProviders.length > 0 ? (
                            serviceProviders.filter(data => data.isActive === true).map((provider) => (
                                <ServiceCard key={provider._id} provider={provider} />
                            ))
                        ) : (
                            <p className="text-center col-span-3">No service providers found.</p>
                        )}

                    </div>
                </main>
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
    )
}

export default UserHome