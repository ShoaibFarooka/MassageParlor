import React from 'react'
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
    return (
        <div>
            <div className="min-h-screen">
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

                <main className="p-8 py-16">
                    <div className="grid grid-cols-4 justify-center sm:grid-cols-3 lg:grid-cols-4 gap-6">
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