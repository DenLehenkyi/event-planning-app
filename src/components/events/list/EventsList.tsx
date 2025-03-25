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
    <div className="max-w-4xl px-4 py-8 ">
      <div className="mb-8 space-y-6">
        <div>
          <label
            htmlFor="importance-filter"
            className="block text-lg font-semibold text-gray-900 mb-2 font-montserrat"
          >
            Фільтр за важливістю:
          </label>
          <select
            id="importance-filter"
            value={selectedImportance}
            onChange={(e) => handleImportanceChange(e.target.value)}
            className="w-full max-w-xs p-3 rounded-lg border border-gray-200 bg-white text-gray-700 font-montserrat text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:shadow-md transition-all duration-200"
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
            className="block text-lg font-semibold text-gray-900 mb-2 font-montserrat"
          >
            Пошук за назвою події:
          </label>
          <div className="relative max-w-md">
            <input
              id="search-events"
              value={searchEvent}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-700 font-montserrat text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:shadow-md transition-all duration-200 pl-10"
              placeholder="Введіть назву для пошуку"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4 font-montserrat hover:text-blue-600 transition-colors duration-200">
                {event.title}
              </h2>
              <div className="space-y-3 text-gray-700 text-sm font-montserrat">
                <div className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-gray-400 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Опис:</span>{" "}
                    {event.description}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Дата:</span>{" "}
                    <span className="text-blue-600 font-medium">
                      {new Date(event.start).toLocaleDateString("uk-UA", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v3l3 3m-3-9a9 9 0 100 18 9 9 0 000-18z"
                    />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">
                      Важливість:
                    </span>{" "}
                    <span
                      className={`inline-block px-3 py-1 rounded-full font-medium text-sm capitalize ${
                        event.importance === "critical"
                          ? "bg-red-100 text-red-800"
                          : event.importance === "important"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {event.importance === "normal"
                        ? "Звичайна"
                        : event.importance === "important"
                        ? "Важлива"
                        : "Критична"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg text-gray-500 text-center font-montserrat">
            Немає подій, що відповідають критеріям пошуку
          </p>
        )}
      </div>
    </div>
  );
}
