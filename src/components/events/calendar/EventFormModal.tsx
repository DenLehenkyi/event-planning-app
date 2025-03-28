import { Event } from "@/lib/types/types";
import { EventFormModalProps } from "@/lib/types/types";

export default function EventFormModal({
  isOpen,
  onClose,
  onSubmit,
  newEvent,
  setNewEvent,
  editingEvent,
}: EventFormModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white-700 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold font-montserrat text-gray-800 mb-4">
          {editingEvent ? "Редагувати подію" : "Додати нову подію"}
        </h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block font-montserrat text-sm text-gray-600 mb-1">
              Назва події
            </label>
            <input
              type="text"
              value={newEvent.title || ""}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg font-montserrat text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block font-montserrat text-sm text-gray-600 mb-1">
              Дата та час
            </label>
            <input
              type="datetime-local"
              value={newEvent.start || ""}
              onChange={(e) =>
                setNewEvent({ ...newEvent, start: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg font-montserrat text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              required
            />
            <span className="absolute right-3 top-10 text-gray-500 pointer-events-none"></span>
          </div>
          <div className="mb-4">
            <label className="block font-montserrat text-sm text-gray-600 mb-1">
              Опис
            </label>
            <textarea
              value={newEvent.description || ""}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg font-montserrat text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-20"
            />
          </div>
          <div className="mb-4">
            <label className="block font-montserrat text-sm text-gray-600 mb-1">
              Важливість
            </label>
            <select
              value={newEvent.importance || "normal"}
              onChange={(e) =>
                setNewEvent({
                  ...newEvent,
                  importance: e.target.value as
                    | "normal"
                    | "important"
                    | "critical",
                })
              }
              className="w-full p-2 border border-gray-300 rounded-lg font-montserrat text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="normal">Звичайна</option>
              <option value="important">Важлива</option>
              <option value="critical">Критична</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-montserrat text-sm font-medium"
            >
              {editingEvent ? "Оновити" : "Додати"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-montserrat text-sm font-medium"
            >
              Скасувати
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
