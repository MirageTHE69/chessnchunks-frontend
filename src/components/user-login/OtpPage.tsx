"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useLoginOtp from "@/hooks/useLoginOtp";
import { signIn } from "next-auth/react";

function OtpVerification() {
  const { otp, setOtp, resetOtp } = useLoginOtp();
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState("");
  const router = useRouter();
  const { email } = useLoginOtp();

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    if (isNaN(Number(value)) || value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (element.nextSibling) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const code = otp.join("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        code,
        isWithOTP: "true",
      });

      if (!result?.error) {
        router.push("/student-dashboard");
      }
    } catch (err) {
      console.error("OTP verification failed:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl text-white font-semibold">OTP Verification</h2>
          <div className="relative h-12 w-28">
            <Image
              src="/chessnchunks-logo.svg"
              alt="Chess n Chunks"
              layout="fill"
              objectFit="contain"
              loading="lazy"
              quality={100}
            />
          </div>
        </div>
        <p className="text-gray-400 text-center mb-4">
          Enter the code sent to your E-mail ID
        </p>
        <div className="flex justify-between mb-6">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              className="w-12 h-12 text-center text-white text-xl bg-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          ))}
        </div>
        <div className="text-center mb-6">
          <p className="text-gray-400">
            Resend OTP in:{" "}
            <span className="font-semibold text-white">
              00:{timer < 10 ? `0${timer}` : timer}
            </span>
          </p>
          <button
            className="text-blue-500 mt-2 hover:underline"
            disabled={timer !== 0}
            onClick={() => {
              setTimer(30);
              resetOtp();
            }}
          >
            Resend
          </button>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            onClick={handleSubmit}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}

export default OtpVerification;
