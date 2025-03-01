import React, { useEffect, useRef, useState } from 'react'
import profile from '../../../assets/images/profile.png'
import { FaSearch, FaSlidersH } from 'react-icons/fa'
import ServiceCard from '../../../components/serviceProvider/ServiceCard';
import { CiBellOn } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";

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

const UserHome = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

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

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

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
                                <div className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg bg-white p-4 z-50">
                                    <h2 className="text-lg font-semibold mb-4">Filters</h2>
                                    {/* Example content – replace or extend as needed */}
                                    <div className="mb-4">
                                        <label className="label">Option 1</label>
                                        <input
                                            type="text"
                                            className="inout"
                                            placeholder="Enter value "
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="label">Option 2</label>
                                        <select className="inout">
                                            <option>Value 1</option>
                                            <option>Value 2</option>
                                            <option>Value 3</option>
                                        </select>
                                    </div>
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

                        <img
                            src={profile}
                            alt={`Profile`}
                            className="w-[60px] min-h-[60px] object-cover rounded-full border-[2px] border-[#858FAD]"
                        />
                    </div>
                </header>

                <main className="py-16">
                    <div className="grid grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {providers.map((provider) => (
                            <ServiceCard key={provider.id} provider={provider} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default UserHome