import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const localizer = momentLocalizer(moment);

const CustomToolbar = ({ label, onNavigate, onView, view }) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg ">
            <div className="flex items-center space-x-4">
                <button onClick={() => onNavigate("TODAY")} className="text-sm font-medium text-[#0E1E40]">
                    Today
                </button>
            </div>

            <div className="flex items-center space-x-4">
                <button onClick={() => onNavigate("PREV")} className="cursor-pointer">
                    <FaChevronLeft />
                </button>

                <span className="text-lg font-bold text-gray-800">{label}</span>

                <button onClick={() => onNavigate("NEXT")} className="cursor-pointer">
                    <FaChevronRight />
                </button>
            </div>

            <div className="flex rounded-xl border border-[#979797]">
                {["day", "week", "month"].map((v) => (
                    <button
                        key={v}
                        onClick={() => onView(v)}
                        className={`px-4 py-2 cursor-pointer text-sm font-medium transition-all ${v === "week" ? "border-l border-r border-[#979797]" : ""
                            } ${v === "day" && "rounded-l-xl"} ${v === "month" && "rounded-r-xl"} ${view === v ? "bg-[#5E50BF] text-white" : "bg-transparent text-black"
                            }`}
                    >
                        {v.charAt(0).toUpperCase() + v.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
};

const AllEvents = ({ events }) => {
    const [formattedEvents, setFormattedEvents] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState("month");

    useEffect(() => {
        if (!events || events.length === 0) return;

        const formatted = events
            .filter(event => event.status === "Approved") // ✅ Keep only approved events
            .map((booking) => {
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
                    color: booking.color || "#5E50BF",
                };
            })
            .filter(event => event !== null);

        setFormattedEvents(formatted);
    }, [events]);

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

    return (
        <div>
            <div className="bg-white shadow rounded-[9.35px] w-full p-6">
                <Calendar
                    localizer={localizer}
                    events={formattedEvents} // ✅ Corrected to use formatted events
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 700, border: "none" }}
                    className="border rounded-md"
                    eventPropGetter={(event) => ({
                        style: {
                            backgroundColor: `${event.color}80`,
                            color: "black",
                            borderTop: "0px",
                            borderRight: "0px",
                            borderBottom: "0px",
                            borderRadius: "10px",
                            borderLeft: `10px solid ${event.color}`,
                            padding: "5px",
                        },
                    })}
                    date={currentDate}
                    onNavigate={(newDate) => setCurrentDate(newDate)}
                    view={currentView}
                    onView={(view) => setCurrentView(view)}
                    components={{
                        toolbar: (props) => <CustomToolbar {...props} view={currentView} />,
                    }}
                />
            </div>
        </div>
    );
};

export default AllEvents;
