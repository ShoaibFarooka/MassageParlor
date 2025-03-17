import React from 'react';
import ServicesHeader from '../components/ServicesHeader';
import NewBookings from './components/NewBookings';
import TodayBookings from './components/TodayBookings';
import TotalRevenue from './components/TotalRevenue';

const Dashboard = () => {


  return (
    <div>
      <ServicesHeader title={'Dashboard'} />

      <div className='flex flex-col md:flex-row w-full mt-[35px] '>
        <div className='md:mr-[35px] lg:mr-[51px] w-full'>
          <div className=''>
            <TotalRevenue />
          </div>

          <div className=''>
            <TodayBookings />
          </div>
        </div>

        <div className='px-[23px] py-[25px] h-fit rounded-[9.35px] bg-white'>
          <h4 className='text-[17.74px] font-bold'>New bookings</h4>
          <NewBookings />
        </div>
      </div>
    </div>
  )
}

export default Dashboard