import React from 'react'
import ServicesHeader from '../components/ServicesHeader'
import TodayBooking from './components/TodayBooking'

const Calendar = () => {
  return (
    <div>
      <ServicesHeader title={'Calender'} />

      <div className='mt-[30px]'>
        <TodayBooking/>
      </div>
    </div>
  )
}

export default Calendar