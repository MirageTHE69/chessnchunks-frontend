"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import useAuth from '@/hooks/useAuth';

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateUser } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      updateUser(data.user, data.token);
      router.push('/otp-verification');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-96 gap-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <h2 className="text-2xl text-white font-semibold mb-1">Welcome Back</h2>
            <p className="text-gray-400">Pickup where you left</p>
          </div>
          <div className="relative h-16 w-16 ml-4">
            <Image src="/chessnchunks-logo.svg" alt="Chess n Chunks" layout="fill" objectFit="contain" loading="lazy" quality={100} />
          </div>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email id" className="w-full px-3 py-2 bg-gray-700 text-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" className="w-full px-3 py-2 bg-gray-700 text-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500" />
          </div>
          <div className="text-center">
            <button type="submit" className="w-full bg-blue-600 text-white py-2 mt-10 rounded hover:bg-blue-700 transition">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;