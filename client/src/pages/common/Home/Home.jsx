import React, { useEffect, useRef, useState } from 'react';
// React Icons (Font Awesome set)
import { FaSearch, FaSlidersH, FaMedal } from 'react-icons/fa';
import ServiceCard from '../../../components/serviceProvider/ServiceCard';
import profile from '../../../assets/images/profile.png';
import CustomModal from '../../../components/CustomModal/CustomModal';
import { useNavigate } from 'react-router-dom';

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
    const [isOpen, setIsOpen] = useState(true);
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const dropdownRef = useRef(null);
    const [condition, setCondition] = useState(false);
    const navigate = useNavigate();
    const [height, setHeight] = useState(165);
    const minVal = 100;
    const maxVal = 200;
    const fillPercentage = ((height - minVal) / (maxVal - minVal)) * 100;

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

    return (
        <div className=" min-h-screen">
            <header className="flex flex-wrap items-center justify-between p-4 ">
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
                </div>

                {/* Right Section (Buttons) */}
                <div className="flex items-center w-full md:w-auto justify-center md:justify-end mt-4 md:mt-0">
                    <button onClick={() => navigate('/register')} className="font-semibold mr-4 cursor-pointer text-gray-700">
                        Sign Up
                    </button>
                    <button
                        onClick={() => navigate('/login')}
                        className="px-4 py-2 bg-[#5E50BF] w-[120px] h-[45px] text-white font-semibold rounded-full rounded-tr-none"
                    >
                        Sign in
                    </button>
                </div>
            </header>

            <main className="p-8 py-16">
                <div className="grid grid-cols-1  md:grid-cols-3 justify-center sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {providers.map((provider) => (
                        <ServiceCard key={provider.id} provider={provider} />
                    ))}
                </div>
            </main>

            <CustomModal isOpen={isOpen} width={'436px'} contentLabel="Modal">
                <div className="text-center flex justify-center items-center flex-col">

                    <div className='mt-10'>
                        <h2 className="text-[30px] font-bold ">Welcome</h2>
                    </div>

                    <div className='py-4'>
                        <p className="text-[20px] font-semibold ">Are you 18 years or older?</p>
                    </div>

                    <div className='mb-8'>
                        <button onClick={() => setCondition(true)} className="cursor-pointer px-4 py-2 bg-[#D74042] w-[131px] h-[48px] text-white rounded-full rounded-tr-none mr-[12px]">
                            No
                        </button>

                        <button onClick={() => { setIsOpen(false); setCondition(false) }} className=" cursor-pointer px-4 py-2  bg-[#5E50BF] w-[131px] h-[48px] text-white rounded-full rounded-tl-none ">
                            Yes
                        </button>
                    </div>

                    {condition && <div className='mb-8'>
                        <p className='text-[#D74042] font-semibold'>
                            Sorry, you must be 18+ to access this platform.
                        </p>
                    </div>}

                </div>
            </CustomModal>
        </div>
    );
}

export default Home;
