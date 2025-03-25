import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Event } from "@/lib/types/types";
import { EventCalendarProps } from "@/lib/types/types";

interface ExtendedEventCalendarProps extends EventCalendarProps {
  isModalOpen: boolean;
}

export default function EventCalendar({
  events,
  onDateSelect,
  onEventClick,
  onDeleteClick,
  isModalOpen,
}: ExtendedEventCalendarProps) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg z-10">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events.map((event) => ({
          id: event.id,
          title: event.title,
          start: event.start,
          backgroundColor:
            event.importance === "critical"
              ? "#ef4444"
              : event.importance === "important"
              ? "#f97316"
              : "#3b82f6",
          borderColor:
            event.importance === "critical"
              ? "#ef4444"
              : event.importance === "important"
              ? "#f97316"
              : "#3b82f6",
          extendedProps: {
            description: event.description,
            importance: event.importance,
          },
        }))}
        selectable={!isModalOpen}
        select={onDateSelect}
        eventClick={onEventClick}
        eventContent={(eventInfo) => (
          <div className="p-2 rounded-lg bg-opacity-90 hover:bg-opacity-100 transition-all duration-200">
            <div className="flex items-start gap-2">
              <div
                className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  eventInfo.event.extendedProps.importance === "critical"
                    ? "bg-red-500"
                    : eventInfo.event.extendedProps.importance === "important"
                    ? "bg-orange-500"
                    : "bg-blue-500"
                }`}
              />
              <div className="flex-1">
                <p className="font-montserrat font-semibold text-sm text-gray-800 truncate">
                  {eventInfo.event.title}
                </p>
                <p className="font-montserrat text-xs text-gray-500 truncate">
                  {eventInfo.event.extendedProps.description}
                </p>
                <p
                  className={`font-montserrat text-xs capitalize ${
                    eventInfo.event.extendedProps.importance === "critical"
                      ? "text-red-600"
                      : eventInfo.event.extendedProps.importance === "important"
                      ? "text-orange-600"
                      : "text-blue-600"
                  }`}
                >
                  {eventInfo.event.extendedProps.importance === "normal"
                    ? "Звичайна"
                    : eventInfo.event.extendedProps.importance === "important"
                    ? "Важлива"
                    : "Критична"}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteClick(eventInfo.event.id);
                }}
                className="delete-button text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
      />
    </div>
  );
}
