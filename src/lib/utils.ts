import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const splitIntoWeeks = (dates: Date[]): Date[][] => {
  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];

  dates.forEach((date) => {
    currentWeek.push(date);
    if (date.getDay() === 6) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return weeks;
};

export const getMonthData = (date: Date): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startDate = new Date(firstDay);
  startDate.setDate(firstDay.getDate() - firstDay.getDay());

  const endDate = new Date(lastDay);
  if (endDate.getDay() !== 6) {
    endDate.setDate(lastDay.getDate() + (6 - lastDay.getDay()));
  }

  const days: Date[] = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
};

export const getWeekData = (date: Date): Date[] => {
  const startDate = new Date(date);
  startDate.setDate(date.getDate() - date.getDay());

  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    days.push(currentDate);
  }

  return days;
};
