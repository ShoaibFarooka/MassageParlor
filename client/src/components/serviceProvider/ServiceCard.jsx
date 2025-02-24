import React from 'react'
import { FaMedal } from 'react-icons/fa'

const ServiceCard = ({ key, provider }) => {
  return (
    <div>
      <div
        key={key}
        className="bg-white relative p-6 pt-[59px] rounded-lg shadow-md text-center w-[260px] flex flex-col items-center"
      >
        {/* Profile Image */}
        <img
          src={provider.image}
          alt={`Profile of ${provider.name}`}
          className="w-[88px] h-[88px] rounded-full mx-auto mb-4 absolute top-[-44px]"
        />

        {/* Name */}
        <h2 className="text-[22px] font-semibold">{provider.name}</h2>

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
            <p className="text-gray-500 text-sm">Clients</p>

          </div>
        </div>

        {/* Specialization */}
        <p className="text-gray-500 mb-4">{provider.specialization}</p>

        {/* Book Now Button */}
        <button className="px-4 py-2 bg-purple-600 text-white rounded-full">
          BOOK NOW
        </button>
      </div>
    </div>
  )
}

export default ServiceCard