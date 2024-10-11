"use client";
import React from 'react';
import AuthProvider from '@/context/auth-context';
import LoginOTPProvider from '@/context/login-otp-context';
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const dmSans = DM_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <LoginOTPProvider>
        <html lang="en">
          <body className={cn(dmSans.className, "min-h-screen bg-black-primary text-white")}>
            {children}
          </body>
        </html>
      </LoginOTPProvider>
    </AuthProvider>
  );
}
