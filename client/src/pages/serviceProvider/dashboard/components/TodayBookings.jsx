import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const TodayBookings = () => {
  const [currentDate] = useState(new Date());

  // All events
  const events = [
    {
      title: "Billy More, 24 Male",
      start: new Date(2025, 2, 17, 16, 0), // 16:00 (4 PM)
      end: new Date(2025, 2, 17, 18, 0), // 17:00 (5 PM)
      color: "#FB7185", // Pink
    },
    {
      title: "Billy More, 24 Male",
      start: new Date(2025, 2, 17, 14, 30), // 14:30 (2:30 PM)
      end: new Date(2025, 2, 17, 15, 0), // 15:00 (3 PM)
      color: "#F87171", // Red
    },
  ];

  // Filter only today's events
  const todayEvents = events.filter(
    (event) => moment(event.start).isSame(moment(), "day")
  );

  return (
    <div className="bg-white shadow-md rounded-md my-6 p-6">
      {/* Custom header displaying "Today" */}
      <h2 className="text-lg font-bold text-gray-800 mb-4">Today</h2>

      <Calendar
        localizer={localizer}
        events={todayEvents} // Only pass today's events
        startAccessor="start"
        endAccessor="end"
        defaultDate={new Date()} // Show today
        defaultView="day" // Show only today's events
        style={{ height: 500, border: "none" }}
        className="border rounded-md"
        toolbar={false} // Hides the navigation buttons (Month, Week, Day, etc.)
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.color || "#5E50BF",
            color: "#fff",
            borderRadius: "8px",
            border: "none",
            padding: "5px",
            height:'100px',
          },
        })}
      />
    </div>
  );
};

export default TodayBookings;
