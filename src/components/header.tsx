"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  FaEnvelope,
  FaBell,
  FaCog,
  FaSearch,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export const Header = () => {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isHideSidebar = [
    "/sign-up",
    "/login",
    "/otp-verification",
    "/invitation",
  ].includes(pathname);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isHideSidebar) return null;

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <header className="w-full bg-[#2A3147] py-4 px-6 flex justify-between items-center relative">
      <div className="relative w-64">
        <input
          type="text"
          placeholder="Search..."
          className="w-full py-2 pl-10 pr-4 bg-[#3A4563] text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute left-3 top-2 text-gray-400" size={20} />
      </div>

      {/* Icons */}
      <div className="flex space-x-6 text-white items-center">
        <Link href="/chat-communication">
          <FaEnvelope
            className="cursor-pointer hover:text-gray-400"
            size={20}
          />
        </Link>
        <FaBell className="cursor-pointer hover:text-gray-400" size={20} />

        <div className="relative" ref={dropdownRef}>
          <FaCog
            className="cursor-pointer hover:text-gray-400"
            size={20}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 overflow-hidden">
              <Link
                href="/profile-settings"
                className="px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                onClick={() => setIsDropdownOpen(false)}
              >
                <FaUser className="mr-2" /> Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
