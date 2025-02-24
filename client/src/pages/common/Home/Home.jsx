import React from 'react';
// React Icons (Font Awesome set)
import { FaSearch, FaSlidersH, FaMedal } from 'react-icons/fa';
import ServiceCard from '../../../components/serviceProvider/ServiceCard';
import profile from '../../../assets/images/profile.png';

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
    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="flex justify-between items-center p-4 bg-white shadow-md">

                <div className="flex items-center space-x-4">
                    <div className='px-16'>
                        <h3 className='text-xl font-bold'>Logo</h3>
                    </div>

                    <div className="relative">

                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-10 pr-4 py-2 rounded-full border border-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />

                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>

                    <button
                        className="p-2 rounded-full bg-white border border-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                        <FaSlidersH className="text-gray-400" />
                    </button>
                </div>

                <div className="flex space-x-4">
                    <button className="text-gray-600">Sign Up</button>
                    <button className="px-4 py-2 bg-[#5E50BF] w-[145px] h-[51px] text-white rounded-full rounded-tr-none ">
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
        </div>
    );
}

export default Home;
