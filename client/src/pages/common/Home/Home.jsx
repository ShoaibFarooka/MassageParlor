import React from 'react';
// React Icons (Font Awesome set)
import { FaSearch, FaSlidersH, FaMedal } from 'react-icons/fa';

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
        image: 'https://placehold.co/100x100',
    },
    {
        id: 2,
        name: 'Gwen Pie',
        age: 21,
        location: 'Brooklyn',
        years: 3,
        clients: 24,
        specialization: 'Specializes in Hot Stone and Sports massage.',
        image: 'https://placehold.co/100x100',
    },
    {
        id: 3,
        name: 'Gwen Pie',
        age: 21,
        location: 'Brooklyn',
        years: 3,
        clients: 24,
        specialization: 'Specializes in Hot Stone and Sports massage.',
        image: 'https://placehold.co/100x100',
    },
    {
        id: 4,
        name: 'Gwen Pie',
        age: 21,
        location: 'Brooklyn',
        years: 3,
        clients: 24,
        specialization: 'Specializes in Hot Stone and Sports massage.',
        image: 'https://placehold.co/100x100',
    },
    {
        id: 5,
        name: 'Gwen Pie',
        age: 21,
        location: 'Brooklyn',
        years: 3,
        clients: 24,
        specialization: 'Specializes in Hot Stone and Sports massage.',
        image: 'https://placehold.co/100x100',
    },
    {
        id: 6,
        name: 'Gwen Pie',
        age: 21,
        location: 'Brooklyn',
        years: 3,
        clients: 24,
        specialization: 'Specializes in Hot Stone and Sports massage.',
        image: 'https://placehold.co/100x100',
    },
    {
        id: 7,
        name: 'Gwen Pie',
        age: 21,
        location: 'Brooklyn',
        years: 3,
        clients: 24,
        specialization: 'Specializes in Hot Stone and Sports massage.',
        image: 'https://placehold.co/100x100',
    },
    {
        id: 8,
        name: 'Gwen Pie',
        age: 21,
        location: 'Brooklyn',
        years: 3,
        clients: 24,
        specialization: 'Specializes in Hot Stone and Sports massage.',
        image: 'https://placehold.co/100x100',
    },
];

function Home() {
    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header */}
            <header className="flex justify-between items-center p-4 bg-white shadow-md">
                {/* Left: Search + Filter */}
                <div className="flex items-center space-x-4">
                    {/* Search Box */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-10 pr-4 py-2 rounded-full border border-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                        {/* Search Icon */}
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>

                    {/* Filter Button */}
                    <button
                        className="p-2 rounded-full bg-white border border-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                        <FaSlidersH className="text-gray-400" />
                    </button>
                </div>

                {/* Right: Auth Buttons */}
                <div className="flex space-x-4">
                    <button className="text-gray-600">Sign Up</button>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-full">
                        Sign in
                    </button>
                </div>
            </header>

            {/* Main Content: Grid of Cards */}
            <main className="p-8">
                <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {providers.map((provider) => (
                        <div
                            key={provider.id}
                            className="bg-white p-6 rounded-lg shadow-md text-center "
                        >
                            {/* Profile Image */}
                            <img
                                src={provider.image}
                                alt={`Profile of ${provider.name}`}
                                className="w-24 h-24 rounded-full mx-auto mb-4"
                            />

                            {/* Name */}
                            <h2 className="text-xl font-semibold">{provider.name}</h2>
                            <p className="text-gray-500">
                                Age {provider.age} | Located in {provider.location}
                            </p>

                            {/* Stats: Years + Clients + Medal */}
                            <div className="flex justify-center items-center space-x-2 my-4">
                                <div className="text-center">
                                    <p className="text-lg font-bold">{provider.years}</p>
                                    <p className="text-gray-500 text-sm">Years</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-lg font-bold">{provider.clients}</p>
                                    <p className="text-gray-500 text-sm">Clients</p>
                                </div>
                                <div className="text-center">
                                    <FaMedal className="text-yellow-500 text-xl" />
                                </div>
                            </div>

                            {/* Specialization */}
                            <p className="text-gray-500 mb-4">{provider.specialization}</p>

                            {/* Book Now Button */}
                            <button className="px-4 py-2 bg-purple-600 text-white rounded-full">
                                BOOK NOW
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Home;
