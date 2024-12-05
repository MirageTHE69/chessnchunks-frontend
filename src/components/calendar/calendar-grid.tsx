"use client";

import React from "react";
import { CalendarCell } from "./calendar-cell";
import { CalendarEvent } from "@/types/calendar";

interface CalendarGridProps {
  data: Date[][];
  events: CalendarEvent[];
  view: "month" | "week";
  onEventClick: (event: CalendarEvent) => void;
  onDateClick: (date: Date) => void;
}

export function CalendarGrid({
  data,
  events,
  view,
  onEventClick,
  onDateClick,
}: CalendarGridProps) {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="grid grid-cols-7 gap-px bg-gray-200">
      {weekDays.map((day) => (
        <div key={day} className="bg-gray-100 p-2 text-center font-semibold">
          {day}
        </div>
      ))}
      {data.map((week, weekIndex) => (
        <React.Fragment key={weekIndex}>
          {week.map((date, dateIndex) => (
            <CalendarCell
              key={`${weekIndex}-${dateIndex}`}
              date={date}
              events={events.filter(
                (event) => event.start.toDateString() === date.toDateString()
              )}
              view={view}
              onEventClick={onEventClick}
              onDateClick={onDateClick}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
