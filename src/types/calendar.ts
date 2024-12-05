export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
}

export interface CalendarViewProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onDateClick: (date: Date) => void;
}

export type CalendarViewType = "month" | "week";

export interface APIEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  academyId: string;
  createdAt: string;
  updatedAt: string;
  createdById: string;
}
