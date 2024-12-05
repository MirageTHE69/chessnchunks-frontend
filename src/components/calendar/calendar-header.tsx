"use client";

import React from "react";
import { Button } from "@/components/button2";

interface CalendarHeaderProps {
  view: "month" | "week";
  onViewChange: (view: "month" | "week") => void;
}

export function CalendarHeader({ view, onViewChange }: CalendarHeaderProps) {
  return (
    <div className="flex justify-end items-center p-4">
      <div className="space-x-2 flex items-center">
        <Button onClick={() => onViewChange("month")}>Month</Button>
        <Button onClick={() => onViewChange("week")}>Week</Button>
      </div>
    </div>
  );
}
