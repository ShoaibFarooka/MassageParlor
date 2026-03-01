import React from 'react';

const TodayBooking = ({ events }) => {

    const calculateAge = (dob) => {
        if (!dob) return null;
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const today = new Date().toLocaleDateString('en-CA');

    const todaysEvents = events.filter(
        event => event.startDate?.split('T')[0] === today && event.status === 'Approved'
    );



    return (
        <div className="md:w-[287px] w-full max-h-[80vh] overflow-y-auto relative bg-white p-2.5 rounded-[9.35px] min-h-[80vh] mb-8">
            <h3 className="text-[18px] text-[#202224] font-bold p-3">Today</h3>
            <div className='border-[#E0E0E0] border-t'>
                {todaysEvents.length === 0 && (
                    <p className="text-center text-gray-500 py-4">No bookings for today</p>
                )}

                {todaysEvents.map(event => {
                    const provider = event.serviceProvider;
                    const age = provider?.
                        dateOfBirth ? calculateAge(provider.
                            dateOfBirth) : null;

                    return (
                        <div key={event._id} className="pt-[26px]">
                            <div className="relative w-full rounded-br-none mb-[24px] rounded-[24px] bg-pink-200 shadow flex items-center">

                                <span className="absolute top-2 left-10 text-xs text-gray-800">
                                    {provider
                                        ? `${provider?.name || 'N/A'}${age ? ` | ${age} yrs` : ''} | ${provider?.gender || 'N/A'}`
                                        : 'N/A'}
                                </span>

                                <div className="absolute left-0 top-0 bottom-0 w-5 rounded-l-[24px] bg-pink-500"></div>

                                <div className="pl-10 pt-6 min-h-[95px]">
                                    <p className="text-sm font-bold text-gray-900 pt-[13px]">
                                        {event?.service_id?.name} - {event?.service_id?.duration || 'N/A'}h
                                    </p>
                                    <p className="text-pink-700 font-semibold text-sm py-1">
                                        {event?.service_id?.description
                                            ? event.service_id.description.length > 50
                                                ? `${event.service_id.description.substring(0, 50)}...`
                                                : event.service_id.description
                                            : ''}
                                    </p>
                                    <p className="text-gray-600 text-xs pb-1">
                                        {event.startTime} - {event.endTime}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TodayBooking;
