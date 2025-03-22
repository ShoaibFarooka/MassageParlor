import React, { useEffect, useState } from 'react'
import ServicesHeader from '../components/ServicesHeader'
import TodayBooking from './components/TodayBooking'
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import bookingService from '../../../services/bookingService';

const Calendar = () => {
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
    <div>
      <ServicesHeader title={'Calender'} />

      <div className='mt-[30px]'>
        <TodayBooking events={events}/>
      </div>
    </div>
  )
}

export default Calendar