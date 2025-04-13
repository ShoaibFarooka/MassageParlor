import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const TodayBookings = ({ events }) => {
    const today = new Date().toISOString().split('T')[0];
    const [formattedEvents, setFormattedEvents] = useState([]);

    useEffect(() => {
        if (!events || events.length === 0) return;

        const newBooking = events
            .filter(event => event.startDate?.split('T')[0] === today)
            .filter(event => event.status === 'Approved');

        const formatted = newBooking.map((booking) => {
            const startDate = new Date(booking.startDate);
            const startTime = parseTime(booking.startTime);
            const endTime = parseTime(booking.endTime);

            if (isNaN(startDate.getTime())) {
                console.error("Invalid start date:", booking.startDate);
                return null;
            }

            return {
                id: booking._id,
                title: booking.service_id?.name || "Untitled Event",
                start: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startTime.hours, startTime.minutes),
                end: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), endTime.hours, endTime.minutes),
                color: booking?.service_id?.calendarColor,
                status: booking.status,
            };
        }).filter(event => event !== null);

        setFormattedEvents(formatted);
    }, [events, today]);

    // Function to parse 12-hour format "10:00 AM" → { hours: 10, minutes: 0 }
    const parseTime = (timeString) => {
        if (!timeString) return { hours: 0, minutes: 0 };

        const match = timeString.match(/(\d+):(\d+) (\w+)/);
        if (!match) {
            console.error("Invalid time format:", timeString);
            return { hours: 0, minutes: 0 };
        }

        let hours = parseInt(match[1], 10);
        const minutes = parseInt(match[2], 10);
        const meridian = match[3];

        if (meridian === "PM" && hours !== 12) hours += 12;
        if (meridian === "AM" && hours === 12) hours = 0;

        return { hours, minutes };
    };

    const colorNameToRGB = {
        Red: [255, 0, 0],
        Green: [0, 128, 0],
        Blue: [0, 0, 255],
        Purple: [128, 0, 128],
        // Add more color mappings as needed
      };
    
    
      const getRGBAColor = (colorName, opacity = 0.5) => {
        const rgb = colorNameToRGB[colorName];
        if (rgb) {
          return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
        }
        // Fallback to a default color if the name isn't found
        return `rgba(0, 0, 0, ${opacity})`;
      };



    return (
        <div className="bg-white shadow rounded-[9.5px] my-6 p-5">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Today</h2>

            <Calendar
                localizer={localizer}
                events={formattedEvents}
                startAccessor="start"
                endAccessor="end"
                defaultDate={new Date()}
                defaultView="day"
                style={{ height: 500, border: "none" }}
                className="border rounded-md"
                toolbar={false}
                eventPropGetter={(event) => {
                    const isPending = event.status === "Pending";
        
                    if (event.color) {
                      return {
                        style: {
                          backgroundColor: `${getRGBAColor(event.color, 0.5)}`,
                          color: "black",
                          borderTop: '0px',
                          borderRight: '0px',
                          borderBottom: '0px',
                          borderRadius: "10px",
                          borderLeft: `10px solid ${event.color}`,
                          padding: "5px",
                          opacity: isPending ? 0.5 : 1,
                        },
                      };
                    }
        
                    // Return an empty style object for events without a color
                    return {};
                  }}
        
            />
        </div>
    );
};

export default TodayBookings;
