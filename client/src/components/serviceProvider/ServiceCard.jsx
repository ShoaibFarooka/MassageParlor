import React from 'react'
import { FaMedal } from 'react-icons/fa'

const ServiceCard = ({ key, provider }) => {
  return (
    <div className='flex justify-center items-center p-4'>
      <div
        key={key}
        className="bg-white relative pt-[59px] rounded-[24px] shadow-md text-center w-[260px] flex flex-col items-center"
      >
        <img
          src={provider.image}
          alt={`Profile of ${provider.name}`}
          className="w-[88px] min-h-[88px] object-cover rounded-full mx-auto mb-4 absolute top-[-44px]"
        />

        <h2 className="text-[22px] font-semibold">{provider.name}</h2>

        <p className="text-[#858FAD] text-[10px] mt-[5px]">
          Age {provider.age} | Located in {provider.location}
        </p>

        <div className="flex justify-center items-center space-x-2 mt-[19px] mb-[22px]">
          <div className="text-center">
            <p className="text-[16.53px] font-bold">{provider.years}</p>
            <p className="text-[#858FAD] text-[8px]">Years</p>
          </div>
          <div className="text-center">
            <p className="text-[16.53px] font-bold">{provider.clients}</p>
            <p className="text-[#858FAD] text-[8px]">Clients</p>
          </div>
          <div className="text-center pt-[5px]">
            <img
              src={provider.image}
              alt={`Profile of ${provider.name}`}
              className="w-[14px] h-[14px] rounded-full mx-auto mb-1.5"
            />

            <p className="text-[#858FAD] text-[8px]">Clients</p>

          </div>
        </div>

        <div className='px-8'>
          <p className="text-[#858FAD] text-[10px] mb-[22px]">{provider.specialization}</p>
        </div>

        <button className="px-4 py-2 h-[44px] w-full border-t border-[#E0E3EA]">
          BOOK NOW
        </button>
      </div>
    </div>
  )
}

export default ServiceCard