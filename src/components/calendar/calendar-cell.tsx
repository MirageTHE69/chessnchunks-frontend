"use client";

import React from "react";
import { CalendarEvent } from "@/types/calendar";

interface CalendarCellProps {
  date: Date;
  events: CalendarEvent[];
  view: "month" | "week";
  onEventClick: (event: CalendarEvent) => void;
  onDateClick: (date: Date) => void;
}

export function CalendarCell({
  date,
  events,
  view,
  onEventClick,
  onDateClick,
}: CalendarCellProps) {
  const isToday = date.toDateString() === new Date().toDateString();

  return (
    <div
      className={`p-2 min-h-[100px] ${isToday ? "bg-blue-50" : ""}`}
      onClick={() => onDateClick(date)}
    >
      <div
        className={`text-sm ${
          isToday ? "font-bold text-blue-600" : "text-gray-500"
        }`}
      >
        {date.getDate()}
      </div>
      <div className="mt-1 space-y-1">
        {events.map((event) => (
          <div
            key={event.id}
            className="text-xs p-1 bg-blue-100 text-blue-800 rounded cursor-pointer truncate"
            onClick={(e) => {
              e.stopPropagation();
              onEventClick(event);
            }}
          >
            {event.title}
          </div>
        ))}
      </div>
    </div>
  );
}
