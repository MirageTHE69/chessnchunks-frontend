"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const REDIRECT_TIME = 10;

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [countdown, setCountdown] = useState(REDIRECT_TIME);

  useEffect(() => {
    if (!sessionId) {
      router.push("/");
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/login");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionId, router]);

  return (
    <div className="min-h-screen bg-black-primary text-white">
      <div className="absolute top-4 left-4">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Return to Home
        </button>
      </div>

      <div className="container max-w-2xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black-secondary rounded-2xl p-8 space-y-8 border border-gray-800"
        >
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-500"
            >
              <CheckCircle2 className="w-8 h-8" />
            </motion.div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold">
                Welcome to Chess in Chunks!
              </h1>
              <p className="text-gray-400">
                Your registration has been completed successfully.
              </p>
            </div>

            <div className="mt-8 space-y-6">
              <div className="grid gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start gap-4 bg-black-primary p-4 rounded-lg border border-gray-800"
                >
                  <Mail className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                  <div className="space-y-1">
                    <h3 className="font-medium">Check Your Email</h3>
                    <p className="text-sm text-gray-400">
                      We've sent your login credentials to your registered email
                      address. Please check your inbox.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-start gap-4 bg-black-primary p-4 rounded-lg border border-gray-800"
                >
                  <div className="space-y-1">
                    <h3 className="font-medium">Get Started</h3>
                    <p className="text-sm text-gray-400">
                      After logging in, you can access your dashboard, view your
                      enrolled classes, and start your chess journey.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-sm text-gray-400 mt-6"
            >
              Redirecting to login page in {countdown} seconds...
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="space-y-3"
          >
            <button
              onClick={() => router.push("/login")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Go to Login
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center text-xs text-gray-500"
          >
            Reference ID: {sessionId}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
