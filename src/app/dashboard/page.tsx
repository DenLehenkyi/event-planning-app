"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { signOutUser } from "@/lib/firebase/firebaseAuthServices";
import {
  addEventToFirestore,
  getEventsFromFirestore,
  updateEventInFirestore,
  deleteEventFromFirestore,
} from "@/lib/firebase/firestore";
import { Event } from "@/lib/types/types";
import DashboardHeader from "@/components/events/calendar/DashboardHeader";
import EventCalendar from "@/components/events/calendar/EventCalendar";
import EventFormModal from "@/components/events/calendar/EventFormModal";
import DeleteConfirmationModal from "@/components/events/calendar/DeleteConfirmationModal";
import EventLists from "@/components/events/list/EventsList";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    start: "",
    description: "",
    importance: "normal",
  });
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [displayType, setDisplayType] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (user) {
      const fetchEvents = async () => {
        const userEvents = await getEventsFromFirestore(user.uid);
        setEvents(userEvents);
      };
      fetchEvents();
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user && isMounted) {
      router.push("/login");
    }
  }, [user, loading, router, isMounted]);

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newEvent.title || !newEvent.start) return;

    if (editingEvent) {
      const updatedEvent = { ...editingEvent, ...newEvent } as Event;
      await updateEventInFirestore(user.uid, updatedEvent);
      setEvents(
        events.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        )
      );
      setEditingEvent(null);
    } else {
      const eventToAdd = await addEventToFirestore(
        user.uid,
        newEvent as Omit<Event, "id">
      );
      setEvents([...events, eventToAdd]);
    }
    setNewEvent({
      title: "",
      start: "",
      description: "",
      importance: "normal",
    });
    setShowFormModal(false);
  };

  const handleDateSelect = (selectInfo: any) => {
    const selectedDate = new Date(selectInfo.startStr);
    const formattedDate = selectedDate.toISOString().slice(0, 16);
    setNewEvent({ ...newEvent, start: formattedDate });
    setShowFormModal(true);
  };

  const handleEventClick = (clickInfo: any) => {
    const event = events.find((e) => e.id === clickInfo.event.id);
    if (event) {
      setEditingEvent(event);
      const formattedStart = new Date(event.start).toISOString().slice(0, 16);
      setNewEvent({
        title: event.title,
        start: formattedStart,
        description: event.description,
        importance: event.importance,
      });
      setShowFormModal(true);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!user) return;
    await deleteEventFromFirestore(user.uid, eventId);
    setEvents(events.filter((event) => event.id !== eventId));
    setShowDeleteModal(null);
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      if (isMounted) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Помилка виходу:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Завантаження...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  console.log(displayType);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <DashboardHeader
          userName={user.displayName || user.email || ""}
          onSignOut={handleSignOut}
        />
        <div className="mb-12">
          <button
            onClick={() => setShowFormModal(true)}
            className="px-5 py-4 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-800 transition font-montserrat"
          >
            Додати подію
          </button>
        </div>
        <div className="mb-12">
          <p className="mb-6 text-lg font-bold">Виберіть режим відображення</p>
          <select
            className="bg-purple-50 font-bold text-white text-lg rounded-lg block p-2.5 dark:bg-purple-700"
            value={displayType}
            onChange={(e) => setDisplayType(e.target.value)}
          >
            <option value="list">Список</option>
            <option value="calendar">Календар</option>
          </select>
        </div>
        {displayType === "calendar" && (
          <>
            <div
              className={`relative z-10 ${
                showFormModal || showDeleteModal ? "pointer-events-none" : ""
              }`}
            >
              <EventCalendar
                events={events}
                onDateSelect={handleDateSelect}
                onEventClick={handleEventClick}
                onDeleteClick={(eventId) => setShowDeleteModal(eventId)}
                isModalOpen={showFormModal || !!showDeleteModal}
              />
            </div>
            <EventFormModal
              isOpen={showFormModal}
              onClose={() => {
                setShowFormModal(false);
                setEditingEvent(null);
                setNewEvent({
                  title: "",
                  start: "",
                  description: "",
                  importance: "normal",
                });
              }}
              onSubmit={handleEventSubmit}
              newEvent={newEvent}
              setNewEvent={setNewEvent}
              editingEvent={editingEvent}
            />
          </>
        )}
        {displayType === "list" && <EventLists events={events}></EventLists>}
        <DeleteConfirmationModal
          isOpen={!!showDeleteModal}
          onClose={() => setShowDeleteModal(null)}
          onConfirm={() =>
            showDeleteModal && handleDeleteEvent(showDeleteModal)
          }
        />
      </div>
    </div>
  );
}
