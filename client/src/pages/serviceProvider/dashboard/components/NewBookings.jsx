import React, { useEffect, useState } from 'react';
import bookingService from '../../../../services/bookingService';

const NewBookings = ({ events }) => {
  const [updatedEvents, setUpdatedEvents] = useState(events);

  useEffect(() => {
    setUpdatedEvents(events);
  }, [events]);

  const handleStatusUpdate = async (eventId, newStatus) => {
    console.log(eventId, newStatus);

    try {
      setUpdatedEvents(prevEvents =>
        prevEvents.map(event =>
          event._id === eventId ? { ...event, status: newStatus } : event
        )
      );

      const response = await bookingService.updateBooking(eventId, { status: newStatus });

      console.log(response, '121123323');
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status.');
      setUpdatedEvents(events);
    }
  };

  // Function to format date and time
  const formatDate = (dateString, timeString) => {
    if (!dateString || !timeString) return 'Invalid Date';

    const date = new Date(dateString);
    const [time, meridian] = timeString.split(' ');

    return date.toLocaleString('en-US', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }) + ` ${time} ${meridian}`;
  };

  // Filter only pending events
  const pendingEvents = updatedEvents.filter(event => event.status === 'Pending');

  return (
    <div className="min-w-[300px]">
      {pendingEvents.length > 0 ? (
        pendingEvents.map(event => (
          <div
            key={event._id}
            className="p-[20px] mt-[34px] mb-[16px] relative rounded-[24px] w-full sm:w-[340px] h-[146px] flex flex-col shadow"
          >
            <span className="text-sm font-semibold text-[#0E1E40]">
              {event?.service_id?.name} - {event?.service_id?.duration || 'N/A'}h
            </span>
            <span className="text-sm font-semibold text-[#5E50BF] py-[5px]">
              {event?.service_id?.description}
            </span>
            <span className="text-sm font-normal">
              Date: {formatDate(event?.startDate, event?.startTime)}
            </span>

            <div>
              <button
                onClick={() => handleStatusUpdate(event._id, 'Rejected')}
                className="absolute bottom-[-16px] left-0 bg-[#FDE4E4] text-[#D74042] rounded-full rounded-tr-none w-[55%] sm:w-[186px] h-[34px]"
              >
                Decline
              </button>
              <button
                onClick={() => handleStatusUpdate(event._id, 'Approved')}
                className="absolute bottom-[-16px] right-0 bg-[#5E50BF] text-white rounded-full rounded-tr-none w-[55%] sm:w-[186px] h-[34px]"
              >
                Approve
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 text-lg py-10">
          No pending events
        </div>
      )}
    </div>
  );
};

export default NewBookings;
