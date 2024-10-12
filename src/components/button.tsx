import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
  type: "submit" | "button";
};

export const Button = ({ children, className, type = "button" }: Props) => {
  return (
    <button
      className={cn(
        "relative flex items-center justify-center space-x-2 px-4 py-2 bg-gray-primary hover:bg-gray-300 rounded-md border-b-4 border-gray-400 active:border-b-0 active:translate-y-1 shadow-lg text-black-primary font-semibold w-full",
        className
      )}
      type={type}
    >
      {children}
    </button>
  );
};
