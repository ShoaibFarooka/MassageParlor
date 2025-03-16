import React from 'react'

const NewBookings = () => {
  return (
    <div>
         <div className='p-[20px] mt-[34px] mb-[16px] relative rounded-[24px] w-[340px] h-[146px] flex flex-col shadow'>
            <span className='text-sm font-semibold text-[#0E1E40]'>Billy More, 24 Male</span>
            <span className='text-sm font-semibold text-[#5E50BF] py-[5px]'>Swedish Massage</span>
            <span className='text-sm font-normal'>Date: Tue, 23 Dec 2024 3:00pm</span>

            <div className=''>

              <button className='absolute bottom-[-16px] left-0 bg-[#FDE4E4] text-[#D74042] rounded-full rounded-tr-none w-[186px] h-[34px]'>
                Decline
              </button>
              <button className='absolute bottom-[-16px] right-0 bg-[#5E50BF] text-white rounded-full rounded-tr-none w-[186px] h-[34px]'>
                Approve
              </button>
            </div>
          </div>
    </div>
  )
}

export default NewBookings