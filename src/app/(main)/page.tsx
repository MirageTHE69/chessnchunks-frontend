"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Chess board and buttons container */}
      <div className="flex space-x-10">
        {/* Chessboard image container */}
        <div className="w-[400px] h-[400px] bg-blue-100">
          <Image
            src="/chessboard.svg" // Ensure this path is correct for your image
            alt="Chess Board"
            width={600}
            height={600}
            layout="fixed"
          />
        </div>

        {/* Buttons for playing */}
        <div className="flex flex-col  space-y-6">
          {/* Play Online Button */}
          <button className="bg-gray-100 text-gray-900 h-1/4 py-2 px-6 rounded-lg shadow-md hover:bg-gray-200">
            <div className="flex items-center space-x-3">
              {/* Chess Piece Icon */}
              <img src="/play.svg" alt="Chess Piece Icon" className="w-6 h-6" />
              <span>Play Online</span>
            </div>
            <p className="text-sm text-gray-500">
              Challenge the World, One Game at a Time
            </p>
          </button>
          {/* Play with Computer Button */}
          <button className="bg-gray-100 text-gray-900 h-1/4 py-2 px-6 rounded-lg  shadow-md hover:bg-gray-200">
            <div className="flex items-center space-x-3">
              {/* Robot Icon */}
              <img src="/robot.svg" alt="Robot Icon" className="w-6 h-6" />
              <span>Play with Computer</span>
            </div>
            <p className="text-sm text-gray-500">
              Sharpen Your Skills Against the Ultimate Opponent
            </p>
          </button>
          {/* Login Button */}
          <button
            className="bg-gray-100 text-gray-900 h-1/4 py-2 px-6 rounded-lg shadow-md hover:bg-gray-200"
            onClick={() => router.push("/login")}
          >
            <div className="flex items-center space-x-3">
              {/* Login Icon */}
              <img src="/login.svg" alt="Login Icon" className="w-6 h-6" />
              <span>Login</span>
            </div>
          </button>
          {/* Sign Up Button */}

          <button
            className="bg-gray-100 text-gray-900 h-1/4 py-2 px-6 rounded-lg shadow-md hover:bg-gray-200"
            onClick={() => router.push("/sign-up")}
          >
            <div className="flex items-center space-x-3">
              {/* Sign Up Icon */}
              <img src="/signup.svg" alt="Sign Up Icon" className="w-6 h-6" />
              <span>Sign Up</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
