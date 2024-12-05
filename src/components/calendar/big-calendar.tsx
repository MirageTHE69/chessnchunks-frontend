"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CalendarHeader } from "./calendar-header";
import { CalendarGrid } from "./calendar-grid";
import { Button } from "@/components/button2";
import { CalendarEvent, CalendarViewType, APIEvent } from "@/types/calendar";
import { getMonthData, getWeekData, splitIntoWeeks } from "@/lib/utils";
import { useFetchAllEventsQuery } from "@/api/eventApi";

export function BigCalendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<CalendarViewType>("month");
  const [calendarData, setCalendarData] = useState<Date[][]>([[]]);

  const { data: apiEvents = [], isLoading, error } = useFetchAllEventsQuery();

  const events = useMemo(() => {
    return apiEvents.map((event: APIEvent): CalendarEvent[] => ({
      id: event.id,
      title: event.title,
      start: new Date(event.startDate),
      end: new Date(event.endDate),
      description: event.description,
    }));
  }, [apiEvents]);

  useEffect(() => {
    updateCalendarData();
  }, [currentDate, view]);

  const updateCalendarData = () => {
    const flatDates =
      view === "month" ? getMonthData(currentDate) : getWeekData(currentDate);
    const weeklyDates = splitIntoWeeks(flatDates);
    setCalendarData(weeklyDates);
  };

  const handlePrevious = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      if (view === "month") {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setDate(newDate.getDate() - 7);
      }
      return newDate;
    });
  };

  const handleNext = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      if (view === "month") {
        newDate.setMonth(newDate.getMonth() + 1);
      } else {
        newDate.setDate(newDate.getDate() + 7);
      }
      return newDate;
    });
  };

  const handleViewChange = (newView: CalendarViewType) => {
    setView(newView);
  };

  const handleEventClick = (event: CalendarEvent) => {
    console.log("Event clicked:", event);
  };

  const handleDateClick = (date: Date) => {
    console.log("Date clicked:", date);
  };

  if (isLoading) {
    return (
      <div className="mt-10 w-full bg-white rounded-lg shadow-sm p-8 text-center">
        Loading events...
      </div>
    );
  }

  return (
    <div className="mt-10 w-full  rounded-lg shadow-sm">
      <CalendarHeader view={view} onViewChange={handleViewChange} />
      <div className="flex justify-between items-center py-6 px-4 border-b">
        <Button onClick={handlePrevious} className="hover:bg-gray-300 w-auto">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold text-white">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <Button onClick={handleNext} className="hover:bg-gray-300 w-auto">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <CalendarGrid
        data={calendarData}
        events={events}
        view={view}
        onEventClick={handleEventClick}
        onDateClick={handleDateClick}
      />
    </div>
  );
}
