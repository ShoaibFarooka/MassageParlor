import React from 'react';

const TodayBooking = ({ events }) => {
    const today = new Date().toISOString().split('T')[0]; 

    return (
        <div className="md:w-[287px] w-full max-h-[80vh] overflow-y-auto relative bg-white p-2.5 rounded-[9.35px] min-h-[80vh] mb-8">
            <h3 className="text-[18px] text-[#202224] font-bold p-3">Today</h3>

            <div className='border-[#E0E0E0] border-t'>
                {events
                    .filter(event => event.startDate?.split('T')[0] === today)
                    .filter(event => event.status === 'Approved')
                    .map(event => (
                        <div key={event._id} className="pt-[26px]">
                            <div className="relative w-full rounded-br-none mb-[24px] rounded-[24px] bg-pink-200 shadow flex items-center">
                                <div className="absolute left-0 top-0 bottom-0 w-5 rounded-l-[24px] bg-pink-500"></div>

                                <div className="pl-10 h-[95px]">
                                    <p className="text-sm font-bold text-gray-900 pt-[13px]">{event?.service_id?.name} - {event?.service_id?.duration || 'N/A'}h</p>
                                    <p className="text-pink-700 font-semibold text-sm py-1"> {event?.service_id?.description}</p>
                                    <p className="text-gray-600 text-xs">{event.startTime} - {event.endTime}</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default TodayBooking;
