"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import useLoginOtp from "@/hooks/useLoginOtp";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [loginMethod, setLoginMethod] = useState("password");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { setEmail, email } = useLoginOtp();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (loginMethod === "password") {
        const res = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (res?.error) {
          setError("Invalid email or password.");
        } else {
          router.push("/student-dashboard");
        }
      } else {
        const res = await fetch(
          "http://localhost:5000/api/v1/auth/login-without-password",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          }
        );

        if (res.ok) {
          router.push("/otp-verification");
        } else {
          setError("Failed to send OTP.");
        }
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-900 p-10 rounded-lg shadow-lg w-[50%] gap-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <h2 className="text-2xl text-white font-semibold mb-1">
              Welcome Back
            </h2>
            <p className="text-gray-400">Pickup where you left</p>
          </div>
          <div className="relative h-16 w-16 ml-4">
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

        <form onSubmit={handleLogin}>
          <div className="mb-4 flex justify-around">
            <label className="text-gray-300">
              <input
                type="radio"
                name="loginMethod"
                value="password"
                checked={loginMethod === "password"}
                onChange={() => setLoginMethod("password")}
                className="mr-2"
              />
              Login with Password
            </label>
            <label className="text-gray-300">
              <input
                type="radio"
                name="loginMethod"
                value="otp"
                checked={loginMethod === "otp"}
                onChange={() => setLoginMethod("otp")}
                className="mr-2"
              />
              Login with OTP
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email id"
              className="w-full px-3 py-2 bg-gray-700 text-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          {loginMethod === "password" && (
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Password:</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full px-3 py-2 bg-gray-700 text-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                />
                <span className="absolute right-3 top-3 text-gray-400 cursor-pointer">
                  👁️
                </span>
              </div>
            </div>
          )}

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 mt-10 rounded hover:bg-blue-700 transition"
              disabled={isLoading}
            >
              {isLoading
                ? "Processing..."
                : loginMethod === "otp"
                ? "Next"
                : "Submit"}
            </button>
            {error && (
              <p className="mt-2 text-red-500 text-sm">
                Login failed. Please try again.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
