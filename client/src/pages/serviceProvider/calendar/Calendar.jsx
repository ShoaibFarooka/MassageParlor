import React, { useEffect, useState } from 'react'
import ServicesHeader from '../components/ServicesHeader'
import TodayBooking from './components/TodayBooking'
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import bookingService from '../../../services/bookingService';
import AllEvents from './components/AllEvents';

const Calendar = () => {
  const [events, setEvents] = useState([]);
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
    if (user?._id) {
      getBookingData()
    }
  }, [user?._id]);

  return (
    <div>
      <ServicesHeader title={'Calender'} />

      <div className='mt-[30px] flex w-full'>
        <div>
          <TodayBooking events={events} />

        </div>
        <div className='mt-[30px] md:mt-[0px] md:ml-[30px] w-full'>
          <AllEvents events={events} />
        </div>

      </div>
    </div>
  )
}

export default Calendar