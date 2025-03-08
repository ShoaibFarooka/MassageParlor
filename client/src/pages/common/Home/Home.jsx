import React, { useEffect, useRef, useState } from 'react';
// React Icons (Font Awesome set)
import { FaSearch, FaSlidersH, FaMedal } from 'react-icons/fa';
import ServiceCard from '../../../components/serviceProvider/ServiceCard';
import profile from '../../../assets/images/profile.png';
import CustomModal from '../../../components/CustomModal/CustomModal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import userService from '../../../services/userService';

// Example data array. In a real app, you'd fetch this from an API.
const providers = [
    {
        id: 1,
        name: 'Hansu Luu',
        age: 21,
        location: 'Brooklyn',
        years: 3,
        clients: 24,
        specialization: 'Specializes in Hot Stone and Sports massage.',
        image: profile,
    },
    {
        id: 2,
        name: 'Gwen Pie',
        age: 21,
        location: 'Brooklyn',
        years: 3,
        clients: 24,
        specialization: 'Specializes in Hot Stone and Sports massage.',
        image: profile,
    },
    {
        id: 3,
        name: 'Gwen Pie',
        age: 21,
        location: 'Brooklyn',
        years: 3,
        clients: 24,
        specialization: 'Specializes in Hot Stone and Sports massage.',
        image: profile,
    },
    {
        id: 4,
        name: 'Gwen Pie',
        age: 21,
        location: 'Brooklyn',
        years: 3,
        clients: 24,
        specialization: 'Specializes in Hot Stone and Sports massage.',
        image: profile,
    },
    {
        id: 5,
        name: 'Gwen Pie',
        age: 21,
        location: 'Brooklyn',
        years: 3,
        clients: 24,
        specialization: 'Specializes in Hot Stone and Sports massage.',
        image: profile,
    },
    {
        id: 6,
        name: 'Gwen Pie',
        age: 21,
        location: 'Brooklyn',
        years: 3,
        clients: 24,
        specialization: 'Specializes in Hot Stone and Sports massage.',
        image: profile,
    },
    {
        id: 7,
        name: 'Gwen Pie',
        age: 21,
        location: 'Brooklyn',
        years: 3,
        clients: 24,
        specialization: 'Specializes in Hot Stone and Sports massage.',
        image: profile,
    },
    {
        id: 8,
        name: 'Gwen Pie',
        age: 21,
        location: 'Brooklyn',
        years: 3,
        clients: 24,
        specialization: 'Specializes in Hot Stone and Sports massage.',
        image: profile,
    },
];

function Home() {
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const dropdownRef = useRef(null);
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    const [height, setHeight] = useState(165);
    const minVal = 100;
    const maxVal = 200;
    const fillPercentage = ((height - minVal) / (maxVal - minVal)) * 100;
    const debounceTimer = useRef(null);

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpenFilter(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = () => {
        setIsOpenFilter((prev) => !prev);
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
        <div className=" min-h-screen">
            <header className="flex flex-wrap items-center justify-between p-4 pb-0">
                {/* Left Section */}
                <div className="flex items-center space-x-4 w-full md:w-auto">
                    <div className='px-4 md:px-16'>
                        <h3 className='text-xl font-bold cursor-pointer' onClick={() => setIsOpen(!isOpen)}>Logo</h3>
                    </div>

                    {/* Search Bar */}
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
                            {isOpenFilter && (
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
                </div>

                {/* Right Section (Buttons) */}
                <div className="flex items-center w-full md:w-auto justify-center md:justify-end mt-4 md:mt-0">
                    <button onClick={() => navigate('/register')} className="font-semibold mr-4 cursor-pointer text-gray-700">
                        Sign Up
                    </button>
                    <button
                        onClick={() => navigate('/login')}
                        className="px-4 cursor-pointer py-2 bg-[#5E50BF] w-[120px] h-[45px] text-white font-semibold rounded-full rounded-tr-none"
                    >
                        Sign in
                    </button>
                </div>
            </header>

            <main className="flex justify-center items-center">
                <div className="flex flex-wrap justify-center p-4 max-w-full">
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
    );
}

export default Home;
