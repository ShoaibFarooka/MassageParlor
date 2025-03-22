import React, { useEffect, useState } from 'react';
import ServicesHeader from '../components/ServicesHeader';
import NewBookings from './components/NewBookings';
import TodayBookings from './components/TodayBookings';
import TotalRevenue from './components/TotalRevenue';
import { useDispatch, useSelector } from 'react-redux';
import bookingService from '../../../services/bookingService';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';

const Dashboard = () => {
  const [events, setEvents] = useState([  ]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

    const getBookingData = async () => {
      dispatch(ShowLoading());
      try {
        const response = await bookingService.getBookingsByServiceProvider(user?._id);
        setEvents(response);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        dispatch(HideLoading());
      }
    };
    
  
    useEffect(() => {
      getBookingData();
    }, [user?._id]);

  return (
    <div >
      <ServicesHeader title={'Dashboard'} />

      <div className='flex flex-col md:flex-row w-full mt-[35px] '>
        <div className='md:mr-[35px] lg:mr-[51px] w-full'>
          <div className=''>
            <TotalRevenue events={events}  />
          </div>

          <div className=''>
            <TodayBookings  events={events} />
          </div>
        </div>

        <div className='px-[23px] py-[25px] h-fit  rounded-[9.35px] bg-white'>
          <h4 className='text-[17.74px] font-bold'>New bookings</h4>
          <NewBookings events={events} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard