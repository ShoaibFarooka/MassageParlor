import React, { useState } from 'react'
import { FaMedal } from 'react-icons/fa'
import CustomModal from '../CustomModal/CustomModal';
import service from '../../assets/images/service.png'

const ServiceCard = ({ key, provider }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex justify-center items-center p-4'>
      <div
        onClick={() => setIsOpen(true)}
        key={key}
        className="bg-white cursor-pointer relative pt-[59px] rounded-[24px] shadow-md text-center w-[260px] flex flex-col items-center"
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

      <CustomModal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} contentLabel="Modal" height='90%' >
        <div className="grid md:grid-cols-2 px-9 pb-32">
          <div className=''>

            <div className="w-full flex flex-col items-center">

              <img
                src={provider.image}
                alt={`Profile of ${provider.name}`}
                className="w-[108px] h-[108px] object-cover rounded-full mx-auto mt-[100px]"
              />

              <div className="flex justify-between items-center mt-[17px]">
                <h2 className="text-[22px] font-semibold">{provider.name}</h2>
              </div>

              <p className="text-[#858FAD] text-[12.74px] mt-[8px]">
                Age {provider.age} | Located in {provider.location}
              </p>

              <div className="flex justify-center items-center space-x-2 mt-[19px] mb-[22px]">
                <div className="text-center  w-[118px]">
                  <p className="text-[18.7px] font-bold">{provider.years}</p>
                  <p className="text-[#858FAD] text-[10.86px]">Years</p>
                </div>

                <div className="text-center border-l border-r border-[#E0E3EA] w-[118px]">
                  <p className="text-[18.7px] font-bold">{provider.clients}</p>
                  <p className="text-[#858FAD] text-[10.86px]">Clients</p>
                </div>

                <div className="text-center pt-[5px]  w-[118px]">
                  <img
                    src={provider.image}
                    alt={`Profile of ${provider.name}`}
                    className="w-[19px] h-[19px] rounded-full mx-auto mb-1.5"
                  />

                  <p className="text-[#858FAD] text-[10.86px]">Clients</p>

                </div>
              </div>

              <div className='w-[260px] mx-auto mb-[22px] text-center'>
                <p className="text-[#858FAD] text-[14px] mb-[22px]">{provider.specialization}</p>
              </div>
            </div>

            <h3 className='text-lg font-semibold items-start'>Gallery</h3>

            <div className=' flex'>
              <img src={service} alt="service" className='w-[124px] h-[124px] m-4' />
              <img src={service} alt="service" className='w-[124px] h-[124px] m-4' />
              <img src={service} alt="service" className='w-[124px] h-[124px] m-4' />
            </div>

            <div className=' flex opacity-50'>
              <img src={service} alt="service" className='w-[124px] h-[124px] m-4' />
              <img src={service} alt="service" className='w-[124px] h-[124px] m-4' />
            </div>

          </div>

          <div>
            <div className='pt-[61px]'>
              <h3 className='text-lg font-semibold items-start'>Contacts</h3>

              <div className='bg-white rounded-3xl px-[21px] pt-[17px] h-[80px] mt-5'>
                <span className='text-sm font-semibold pb-[5px]'>Phone Number</span>
                <p className=' text-[12px]'>+1 123 456 7890</p>
              </div>
            </div>

            <div className='pt-[48px] relative'>
              <h3 className='text-lg font-semibold items-start'>Available services</h3>

              <div className='bg-white rounded-3xl px-[21px] pt-[17px] mt-5 pb-[41px]'>
                <span className='text-sm font-semibold pb-[5px]'>Swedish Massage</span>
                <p className='text-[12px]'>A relaxing massage using gentle techniques to soothe muscles and improve circulation.</p>

                <span className='bg-[#5E50BF] rounded-full rounded-tr-none w-[212px] h-[44px] flex justify-center items-center text-white text-sm font-semibold absolute right-0 bottom-[-22px]'>BOOK NOW</span>
              </div>
            </div>

            <div className='pt-[48px] relative'>
              <h3 className='text-lg font-semibold items-start'>Available services</h3>

              <div className='bg-white rounded-3xl px-[21px] pt-[17px] mt-5 pb-[41px]'>
                <span className='text-sm font-semibold pb-[5px]'>Swedish Massage</span>
                <p className='text-[12px]'>A relaxing massage using gentle techniques to soothe muscles and improve circulation.</p>

                <span className='bg-[#5E50BF] rounded-full rounded-tr-none w-[212px] h-[44px] flex justify-center items-center text-white text-sm font-semibold absolute right-0 bottom-[-22px]'>BOOK NOW</span>
              </div>
            </div>

            <div className='pt-[48px] relative'>
              <h3 className='text-lg font-semibold items-start'>Available services</h3>

              <div className='bg-white rounded-3xl px-[21px] pt-[17px] mt-5 pb-[41px]'>
                <span className='text-sm font-semibold pb-[5px]'>Swedish Massage</span>
                <p className='text-[12px]'>A relaxing massage using gentle techniques to soothe muscles and improve circulation.</p>

                <span className='bg-[#5E50BF] rounded-full rounded-tr-none w-[212px] h-[44px] flex justify-center items-center text-white text-sm font-semibold absolute right-0 bottom-[-22px]'>BOOK NOW</span>
              </div>
            </div>


          </div>

        </div>
      </CustomModal>
    </div>
  )
}

export default ServiceCard