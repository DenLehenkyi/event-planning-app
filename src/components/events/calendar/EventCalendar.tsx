import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Event } from "@/lib/types/types";
import { EventCalendarProps } from "@/lib/types/types";

export default function EventCalendar({
  events,
  onDateSelect,
  onEventClick,
  onDeleteClick,
}: EventCalendarProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
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
        selectable={true}
        select={onDateSelect}
        eventClick={onEventClick}
        eventContent={(eventInfo) => (
          <div className="p-1">
            <p className="font-montserrat font-semibold">
              {eventInfo.event.title}
            </p>
            <p className="font-montserrat text-sm">
              {eventInfo.event.extendedProps.description}
            </p>
            <button
              onClick={() => onDeleteClick(eventInfo.event.id)}
              className="text-red-600 hover:text-red-800 font-montserrat text-sm"
            >
              Видалити
            </button>
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
