"use client"; // Client-side component

import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";

export default function OtpVerification() {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill("")); // Array for 6 OTP inputs
  const [timer, setTimer] = useState(30); // Timer for resend OTP

  // Handle OTP input change
  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    if (isNaN(Number(value)) || value.length > 1) return; // Only allow numbers and single character

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input
    if (element.nextSibling) {
      (element.nextSibling as HTMLInputElement).focus(); // Cast to HTMLInputElement
    }
  };

  // Timer countdown logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        
        {/* Header with OTP Verification and Logo */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl text-white font-semibold">OTP Verification</h2>
          <div className="relative h-12 w-28">
            <Image
              src="/chessnchunks-logo.svg" // Ensure this is the correct path to your logo
              alt="Chess n Chunks"
              layout="fill"
              objectFit="contain"
              loading="lazy"
              quality={100}
            />
          </div>
        </div>

        {/* OTP Input Instruction */}
        <p className="text-gray-400 text-center mb-4">
          Enter the code sent to your E-mail ID
        </p>

        {/* OTP Input Fields */}
        <div className="flex justify-between mb-6">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={data}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target, index)}
              className="w-12 h-12 text-center text-white text-xl bg-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          ))}
        </div>

        {/* Resend OTP Section */}
        <div className="text-center mb-6">
          <p className="text-gray-400">
            Resend OTP in: <span className="font-semibold text-white">00:{timer < 10 ? `0${timer}` : timer}</span>
          </p>
          <button
            className="text-blue-500 mt-2 hover:underline"
            disabled={timer !== 0}
            onClick={() => setTimer(30)}
          >
            Resend
          </button>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Link href="/student-dashboard">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
