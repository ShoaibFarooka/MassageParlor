import React, { useState } from 'react';
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
    const [isOpen, setIsOpen] = useState(false);
    const [condition, setCondition] = useState(false);
    const navigate = useNavigate();
    
    return (
        <div className=" min-h-screen">
            <header className="flex justify-between items-center p-4">

                <div className="flex items-center space-x-4">
                    <div className='px-16'>
                        <h3 className='text-xl font-bold' onClick={() => setIsOpen(!isOpen)}>Logo</h3>
                    </div>

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

                <div className="flex">
                    <button className="font-semibold mr-[30px]">Sign Up</button>
                    <button onClick={() => navigate('/user/home')} className="px-4 py-2 bg-[#5E50BF] w-[145px] h-[51px] text-white font-semibold rounded-full rounded-tr-none ">
                        Sign in
                    </button>
                </div>
            </header>

            <main className="p-8 py-16">
                <div className="grid grid-cols-4 justify-center sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {providers.map((provider) => (
                        <ServiceCard key={provider.id} provider={provider} />
                    ))}
                </div>
            </main>

            <CustomModal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} width={'436px'} contentLabel="Modal">
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

                        <button onClick={() => setCondition(false)} className=" cursor-pointer px-4 py-2  bg-[#5E50BF] w-[131px] h-[48px] text-white rounded-full rounded-tl-none ">
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
