"use client";
import React, { createContext, useState, ReactNode } from "react";

interface LoginOTPContextType {
  currentStep: number;
  updateCurrentStep: (step: number) => void;
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
  resetOtp: () => void;
}

export const LoginOTPContext = createContext<LoginOTPContextType | undefined>(undefined);

const LoginOTPProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [otp, setOtp] = useState(["", "", "", ""]);

  const updateCurrentStep = (step: number) => {
    setCurrentStep(step);
  };

  const resetOtp = () => {
    setOtp(["", "", "", ""]);
  };

  return (
    <LoginOTPContext.Provider value={{ currentStep, updateCurrentStep, otp, setOtp, resetOtp }}>
      {children}
    </LoginOTPContext.Provider>
  );
};

export default LoginOTPProvider;
