"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import useLoginOtp from "@/hooks/useLoginOtp";
import { Eye, EyeOff } from "lucide-react";

type LoginMethod = "password" | "otp";

interface LoginFormProps {}

export default function LoginForm({}: LoginFormProps) {
  const [password, setPassword] = useState<string>("");
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("password");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { setEmail, email } = useLoginOtp();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black-primary to-black-secondary p-4">
      <div className="w-full max-w-xl bg-black-secondary/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-white">Welcome Back!</h2>
            <p className="text-gray-primary/80">
              Continue your learning journey
            </p>
          </div>
          <div className="relative h-16 w-16">
            <Image
              src="/chessnchunks-logo.svg"
              alt="Chess n Chunks"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Login Method Selection */}
          <div className="flex justify-center gap-8">
            {["password", "otp"].map((method) => (
              <label
                key={method}
                className="relative flex items-center group cursor-pointer"
              >
                <input
                  type="radio"
                  name="loginMethod"
                  value={method}
                  checked={loginMethod === method}
                  onChange={() => setLoginMethod(method as LoginMethod)}
                  className="sr-only peer"
                />
                <div className="w-5 h-5 border-2 border-gray-primary rounded-full peer-checked:border-blue-500 peer-checked:before:content-[''] peer-checked:before:block peer-checked:before:w-3 peer-checked:before:h-3 peer-checked:before:rounded-full peer-checked:before:bg-blue-500 peer-checked:before:absolute peer-checked:before:top-1 peer-checked:before:left-1 transition-all"></div>
                <span className="ml-3 text-gray-primary group-hover:text-white transition-colors">
                  Login with {method.charAt(0).toUpperCase() + method.slice(1)}
                </span>
              </label>
            ))}
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-gray-primary text-sm font-medium"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-black-primary/50 text-white rounded-lg border border-gray-primary/20 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          {/* Password Input */}
          {loginMethod === "password" && (
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-gray-primary text-sm font-medium"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-black-primary/50 text-white rounded-lg border border-gray-primary/20 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-primary hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          )}

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : loginMethod === "otp" ? (
              "Send OTP"
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
