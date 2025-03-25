export interface Event {
  id: string;
  title: string;
  start: string;
  description: string;
  importance: "normal" | "important" | "critical";
}
export interface EventCalendarProps {
  events: Event[];
  onDateSelect: (selectInfo: any) => void;
  onEventClick: (clickInfo: any) => void;
  onDeleteClick: (eventId: string) => void;
}

export interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  newEvent: Partial<Event>;
  setNewEvent: (event: Partial<Event>) => void;
  editingEvent: Event | null;
}
export interface DashboardHeaderProps {
  userName: string;
  onSignOut: () => void;
}
