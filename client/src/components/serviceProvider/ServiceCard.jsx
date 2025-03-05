import React, { useState, forwardRef, useEffect } from 'react';
import { FaCalendarCheck, FaClock, FaMedal } from 'react-icons/fa'
import CustomModal from '../CustomModal/CustomModal';
import service from '../../assets/images/service.png'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import serviceService from '../../services/serviceService';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loaderSlice';
import { useNavigate } from 'react-router-dom';

const CustomDateInput = forwardRef(({ value, onClick, placeholder }, ref) => (
  <div className="relative" onClick={onClick}>
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      readOnly
      className="w-full input mb-6"
      ref={ref}
    />
    <div className="absolute right-4 top-4 text-[#858FAD] pointer-events-none">
      <FaCalendarCheck />
    </div>
  </div>
));

const CustomTimeInput = forwardRef(({ value, onClick, placeholder }, ref) => (
  <div className="relative" onClick={onClick}>
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      readOnly
      className="w-full input"
      ref={ref}
    />
    <div className="absolute right-4 top-4 text-[#858FAD] pointer-events-none">
      <FaClock />
    </div>
  </div>
));


const ServiceCard = ({ key, provider }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.user);

  const [services, setServices] = useState([]);
  const [galleries, setGalleries] = useState([]);

  const fetchServicesForServiceProvider = async () => {

    dispatch(ShowLoading());
    try {
      const response = await serviceService.getServicesByProvider(provider?._id);
      setServices(response);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      dispatch(HideLoading());
    }

    try {
      dispatch(ShowLoading());
      const gallery = await serviceService.getGalleryByProvider(provider?._id)
      setGalleries(gallery[0])
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      dispatch(HideLoading());
    }
  };

  return (
    <div className='flex justify-center items-center p-4'>
      <div
        onClick={() => { setIsOpen(true); fetchServicesForServiceProvider(); }}
        key={key}
        className="bg-white cursor-pointer relative pt-[59px] rounded-[24px] shadow-md text-center max-w-[260px] flex flex-col items-center"
      >
        <img
          src={provider?.image}
          alt={`Profile of ${provider?.name}`}
          className="w-[88px] h-[88px] object-cover rounded-full mx-auto mb-4 absolute top-[-44px]"
        />

        <h2 className="text-[22px] font-semibold">{provider?.name}</h2>

        <p className="text-[#858FAD] text-[10px] mt-[5px]">
          Age {provider?.age} | Located in {provider?.location}
        </p>

        <div className="flex justify-center items-center space-x-2 mt-[19px] mb-[22px]">
          <div className="text-center">
            <p className="text-[16.53px] font-bold">{provider?.years}</p>
            <p className="text-[#858FAD] text-[8px]">Years</p>
          </div>
          <div className="text-center">
            <p className="text-[16.53px] font-bold">{provider?.clients}</p>
            <p className="text-[#858FAD] text-[8px]">Clients</p>
          </div>
          <div className="text-center pt-[5px]">
            <img
              src={provider?.image}
              alt={`Profile of ${provider?.name}`}
              className="w-[14px] h-[14px] rounded-full mx-auto mb-1.5"
            />

            <p className="text-[#858FAD] text-[8px]">Clients</p>

          </div>
        </div>

        <div className='px-8'>
          <p className="text-[#858FAD] text-[10px] mb-[22px]">{provider?.specialization}</p>
        </div>

        <button className="px-4 py-2 h-[44px] w-full border-t border-[#E0E3EA]">
          BOOK NOW
        </button>
      </div>

      <CustomModal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} contentLabel="Modal" height='90%' >
        <div className="grid grid-cols-1 md:grid-cols-2 px-4 md:px-9 pb-20 md:pb-32">
          <div className=''>

            <div className="w-full flex flex-col items-center">

              <img
                src={provider?.image}
                alt={`Profile of ${provider?.name}`}
                className="w-[108px] h-[108px] object-cover rounded-full mx-auto mt-[100px]"
              />

              <div className="flex justify-between items-center mt-[17px]">
                <h2 className="text-[22px] font-semibold">{provider?.name}</h2>
              </div>

              <p className="text-[#858FAD] text-[12.74px] mt-[8px]">
                Age {provider?.age} | Located in {provider?.location}
              </p>

              <div className="hidden sm:flex justify-center items-center space-x-2 mt-[19px] mb-[22px]">
                <div className="text-center  w-[118px]">
                  <p className="text-[18.7px] font-bold">{provider?.years}</p>
                  <p className="text-[#858FAD] text-[10.86px]">Years</p>
                </div>

                <div className="text-center border-l border-r border-[#E0E3EA] w-[118px]">
                  <p className="text-[18.7px] font-bold">{provider?.clients}</p>
                  <p className="text-[#858FAD] text-[10.86px]">Clients</p>
                </div>

                <div className="text-center pt-[5px]  w-[118px]">
                  <img
                    src={provider?.image}
                    alt={`Profile of ${provider?.name}`}
                    className="w-[19px] h-[19px] rounded-full mx-auto mb-1.5"
                  />

                  <p className="text-[#858FAD] text-[10.86px]">Clients</p>

                </div>
              </div>

              <div className='hidden sm:flex w-[260px] mx-auto mb-[22px] text-center'>
                <p className="text-[#858FAD] text-[14px] mb-[22px]">{provider?.specialization}</p>
              </div>
            </div>

            <h3 className='text-lg font-semibold items-start mt-10 sm:mt-0'>Gallery</h3>
            {galleries?.images?.length > 0 ? (
              <div className="grid grid-cols-2 md::grid-cols-3 lg:grid-cols-3 gap-4">
                {galleries.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Gallery Image ${index + 1}`}
                    className={`w-[100px] sm:w-[124px] h-[100px] sm:h-[124px] m-2 sm:m-4 
                      ${!user && index >= 3 ? "opacity-50 blur-sm" : ""}`}
                  />
                ))}
              </div>
            ) : (
              <p>No images available.</p>
            )}



          </div>

          <div>
            <div className='pt-[61px]'>
              <h3 className='text-lg font-semibold items-start'>Contacts</h3>

              <div className='bg-white rounded-3xl px-[21px] pt-[17px] h-[80px] mt-5'>
                <span className='text-sm font-semibold pb-[5px]'>Phone Number</span>
                <p className=' text-[12px]'>{provider?.number}</p>
              </div>
            </div>

            <div className='pt-[48px] relative'>
              <h3 className='text-lg font-semibold items-start'>Available services</h3>
              {!provider?.isActive && <p className='text-sm text-red-500'>This Service Provider is not Active</p>}
              {services?.map((data, index) => (
                <div key={index} className='relative mb-10' >
                  <div className='bg-white rounded-3xl px-[21px] pt-[17px] mt-5 pb-[41px]'>
                    <span className='text-sm font-semibold pb-[5px]'>{data?.name}</span>
                    <p className='text-[12px]'>{data?.description}</p>

                    <button disabled={!provider?.isActive} onClick={() => { user ? setBookingOpen(true) : navigate('/login') }} className={`bg-[#5E50BF] rounded-full rounded-tr-none w-[212px] h-[44px] flex justify-center items-center text-white text-sm font-semibold absolute right-0 bottom-[-22px] cursor-pointer ${!provider?.isActive && 'opacity-85'}`}>BOOK NOW</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </CustomModal>

      <CustomModal isOpen={bookingOpen} onRequestClose={() => setBookingOpen(false)} contentLabel="Modal" width='400px'>
        <div className="px-4 md:px-6 ">
          <div className=''>

            <div className="w-full flex flex-col items-center">

              <img
                src={provider?.image}
                alt={`Profile of ${provider?.name}`}
                className="w-[108px] h-[108px] object-cover rounded-full mx-auto mt-[100px]"
              />

              <div className="flex justify-between items-center mt-[17px]">
                <h2 className="text-[22px] font-semibold">{provider?.name}</h2>
              </div>

              <p className="text-[#858FAD] text-[12.74px] mt-[8px]">
                Age {provider?.age} | Located in {provider?.location}
              </p>
            </div>
          </div>

          <div className='bg-white rounded-3xl px-[21px] py-[17px]  mt-5'>
            <span className='text-sm font-semibold pb-[5px]'>Phone Number</span>
            <span className='text-[#5E50BF] text-[12px] font-bold block pb-[5px]'>Rs980.00</span>
            <p className=' text-[12px]'>A relaxing massage using gentle techniques to soothe muscles and improve circulation.</p>
          </div>

          <div className='mt-6 pb-20 md:pb-32'>
            <label className=" label mb-6 text-black">
              Booking date and time
            </label>
            <div className="">
              {/* Date Picker */}
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                customInput={<CustomDateInput placeholder="Feb, 28 2025" />}
                dateFormat="MMM, dd yyyy"
              />

              {/* Time Picker */}
              <DatePicker
                selected={selectedTime}
                onChange={(time) => setSelectedTime(time)}
                customInput={<CustomTimeInput placeholder="14:00 pm" />}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </div>
          </div>

          <div className='flex pb-8'>
            <span className='border border-[#5E50BF] mr-2 h-[46px] rounded-full rounded-tr-none flex justify-center items-center w-full text-[#5E50BF] text-sm font-semibold cursor-pointer'>Cancel</span>
            <span className='bg-[#5E50BF] rounded-full h-[46px] rounded-tr-none flex justify-center items-center w-full text-white text-sm font-semibold cursor-pointer'>Confirm</span>
          </div>
        </div>
      </CustomModal>
    </div>
  )
}

export default ServiceCard