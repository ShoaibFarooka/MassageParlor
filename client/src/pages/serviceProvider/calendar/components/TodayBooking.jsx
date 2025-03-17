import React from 'react'

const TodayBooking = () => {
    return (
        <div className='w-[287px] relative bg-white p-2.5 rounded-[9.35px] min-h-[80vh] mb-8'>
            <h3 className='test-[18px] text-[#202224] font-bold p-3'>Today</h3>

            <div className='border-[#E0E0E0] pt-[26px] border-t'>
                <div className="relative w-full rounded-br-none mb-[24px] rounded-[24px] bg-pink-200 shadow flex items-center">
                    <div className="absolute left-0 top-0 bottom-0 w-5 rounded-l-[24px] bg-pink-500"></div>

                    <div className="pl-10 h-[95px] ">
                        <p className="text-sm font-bold text-gray-900 pt-[13px]">Billy More, 24 Male</p>
                        <p className="text-pink-700 font-semibold text-sm py-1">Swedish Massage</p>
                        <p className="text-gray-600 text-xs">16:00 - 17:00</p>
                    </div>
                </div>

            </div>

            <button className='absolute font-semibold text-[16px] bottom-[-25px] right-0 bg-[#5E50BF] text-white rounded-full rounded-tr-none w-[260px] h-[51px]'>
            Add Booking
              </button>
        </div>
    )
}

export default TodayBooking