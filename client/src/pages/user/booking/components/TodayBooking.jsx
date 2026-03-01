import React from 'react';

const TodayBooking = ({ events }) => {
    const calculateAge = (dob) => {
        if (!dob) return null;
        const birthDate = new Date(dob);
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        return age === 0 ? 'N/A' : age;
    };

    const today = new Date().toLocaleDateString('en-CA');

    const todaysEvents = events.filter(event => {
        const eventDate = new Date(event.start).toISOString().split('T')[0];
        return eventDate === today && event.status === 'Approved';
    });

    return (
        <div className="md:w-[287px] w-full max-h-[80vh] overflow-y-auto relative bg-white p-2.5 rounded-[9.35px] min-h-[80vh] mb-8">
            <h3 className="text-[18px] text-[#202224] font-bold p-3">Today</h3>
            <div className="border-[#E0E0E0] border-t">
                {todaysEvents.length === 0 && (
                    <p className="text-center text-gray-500 py-4">No bookings for today</p>
                )}

                {todaysEvents.map((event) => {
                    const provider = event.serviceProvider;
                    const age = provider?.dateOfBirth ? calculateAge(provider.dateOfBirth) : 'N/A';

                    return (
                        <div key={event.id} className="pt-[26px]">
                            <div className="relative w-full rounded-br-none mb-[24px] rounded-[24px] bg-pink-200 shadow flex items-center">
                                <span className="absolute top-2 left-10 text-xs text-gray-800">
                                    {provider
                                        ? `${provider.name || 'N/A'} | ${age !== 'N/A' ? `${age} yrs` : 'N/A'} | ${provider.gender || 'N/A'}`
                                        : 'Loading...'}
                                </span>

                                <div className="absolute left-0 top-0 bottom-0 w-5 rounded-l-[24px] bg-pink-500"></div>

                                <div className="pl-10 pt-7 min-h-[95px]">
                                    <p className="text-sm font-bold text-gray-900 pt-[13px]">
                                        {event?.service_id?.name || 'N/A'} - {event?.service_id?.duration || 'N/A'}h
                                    </p>
                                    <p className="text-pink-700 font-semibold text-sm py-1">
                                        {event?.service_id?.description
                                            ? event.service_id.description.length > 50
                                                ? `${event.service_id.description.substring(0, 50)}...`
                                                : event.service_id.description
                                            : ''}
                                    </p>
                                    <p className="text-gray-600 text-xs pb-1">
                                        {`${new Date(event.start).getHours()}:${new Date(event.start).getMinutes()} - ${new Date(event.end).getHours()}:${new Date(event.end).getMinutes()}`}
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
