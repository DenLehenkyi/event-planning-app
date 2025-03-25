import { Event } from "@/lib/types/types";
import React, { useState, useEffect } from "react";

export default function EventLists({ events = [] }: { events: Event[] }) {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [selectedImportance, setSelectedImportance] = useState<string>("all");
  const [searchEvent, setSearchEvent] = useState<string>("");

  useEffect(() => {
    applyFilters();
  }, [events, selectedImportance, searchEvent]);

  const applyFilters = () => {
    let result = [...events];

    if (selectedImportance !== "all") {
      result = result.filter(
        (event) => event.importance === selectedImportance
      );
    }

    if (searchEvent.trim() !== "") {
      result = result.filter((event) =>
        event.title.toLowerCase().includes(searchEvent.toLowerCase())
      );
    }

    setFilteredEvents(result);
  };

  const handleImportanceChange = (importance: string) => {
    setSelectedImportance(importance);
  };

  const handleSearchChange = (title: string) => {
    setSearchEvent(title);
  };

  return (
    <div className=" max-w-3xl px-4 py-8 sm:px-6 lg:max-w-4xl">
      <div className="mb-6 space-y-6">
        <div>
          <label
            htmlFor="importance-filter"
            className="block text-lg font-medium text-gray-900 mb-2"
          >
            Фільтр за важливістю:
          </label>
          <select
            id="importance-filter"
            value={selectedImportance}
            onChange={(e) => handleImportanceChange(e.target.value)}
            className="w-full max-w-xs p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg text-gray-700 bg-white shadow-sm"
          >
            <option value="all">Усі події</option>
            <option value="normal">Звичайна</option>
            <option value="important">Важлива</option>
            <option value="critical">Критична</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="search-events"
            className="block text-lg font-medium text-gray-900 mb-2"
          >
            Пошук за назвою події:
          </label>
          <input
            id="search-events"
            value={searchEvent}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full max-w-md px-4 py-3 font-medium bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg shadow-sm placeholder-gray-400"
            placeholder="Введіть назву для пошуку"
          />
        </div>
      </div>

      <div className="space-y-8">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 hover:text-blue-600 transition-colors duration-200 leading-tight">
                  {event.title}
                </h2>
                <div className="space-y-4 text-lg">
                  <p className="text-gray-700 flex items-start">
                    <span className="font-medium text-gray-900 min-w-[100px] shrink-0">
                      Опис:
                    </span>
                    <span className="ml-3">{event.description}</span>
                  </p>
                  <p className="text-gray-700 flex items-center">
                    <span className="font-medium text-gray-900 min-w-[100px] shrink-0">
                      Дата:
                    </span>
                    <span className="ml-3 text-blue-600 font-medium">
                      {new Date(event.start).toLocaleDateString("uk-UA", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </p>
                  <p className="text-gray-700 flex items-center">
                    <span className="font-medium text-gray-900 min-w-[100px] shrink-0">
                      Важливість:
                    </span>
                    <span
                      className={`ml-3 px-3 py-1.5 rounded-full font-medium ${
                        event.importance === "critical"
                          ? "bg-red-100 text-red-800"
                          : event.importance === "important"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {event.importance}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg text-gray-600 text-center">
            Немає подій, що відповідають критеріям пошуку
          </p>
        )}
      </div>
    </div>
  );
}
