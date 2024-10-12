"use client";  // Client-side component

import { useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMethod, setLoginMethod] = useState("password"); // Added state for login method
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="bg-gray-900 p-10 rounded-lg shadow-lg w-[50%] gap-10">

        {/* Flex container for welcome message and logo */}
        <div className="flex justify-between items-center mb-6">
          {/* Welcome Text Section */}
          <div className="flex-1">
            <h2 className="text-2xl text-white font-semibold mb-1">Welcome Back</h2>
            <p className="text-gray-400">Pickup where you left</p>
          </div>

          {/* Logo Section */}
          <div className="relative h-16 w-16 ml-4">
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

        {/* Form */}
        <form>
          {/* Radio buttons for login method */}
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

          {/* Email Field */}
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

          {/* Password Field: Only show when login method is "password" */}
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
                  👁️ {/* You can replace this with an eye icon for show/hide password functionality */}
                </span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 mt-10 rounded hover:bg-blue-700 transition"
              onClick={(e) => {
                e.preventDefault();
                if (loginMethod === "otp") {
                  router.push('otp-verification');
                } else {
                  // Submit form for email/password login
                  console.log("Login with Email and Password:", { email, password });
                }
              }}
            >
              {loginMethod === "otp" ? "Next" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
