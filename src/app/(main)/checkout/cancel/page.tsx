"use client";

import React, { useEffect, useState } from "react";
import { AlertCircle, ChevronLeft, Mail, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const REDIRECT_TIME = 10;

export default function CheckoutCancelPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(REDIRECT_TIME);

  useEffect(() => {
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
  }, [router]);

  return (
    <div className="min-h-screen bg-black-primary text-white">
      <div className="absolute top-4 left-4">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Return to Dashboard
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
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 text-red-500"
            >
              <XCircle className="w-8 h-8" />
            </motion.div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Payment Cancelled</h1>
              <p className="text-gray-400">
                Your transaction has been cancelled. No charges were made.
              </p>
            </div>

            <div className="mt-8 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-start gap-4 bg-black-primary p-4 rounded-lg border border-gray-800"
              >
                <AlertCircle className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                <div className="space-y-1">
                  <h3 className="font-medium">Need Help?</h3>
                  <p className="text-sm text-gray-400">
                    If you experienced any issues during checkout, please
                    contact our support team.
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-sm text-gray-400 mt-6"
            >
              Redirecting to dashboard in {countdown} seconds...
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="space-y-3"
          >
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Return to Dashboard
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
