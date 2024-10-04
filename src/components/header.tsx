"use client";

import { useRouter } from 'next/navigation'
import { FaEnvelope, FaBell, FaCog, FaSearch } from 'react-icons/fa'; // Icons

type Props = {};
export const Header = (props: Props) => {
  const router = useRouter();
  return (
    <header className="w-full bg-[#2A3147] py-4 px-6 flex justify-between items-center">
      {/* Search Bar */}
      <div className="relative w-64">
        <input
          type="text"
          placeholder="Search..."
          className="w-full py-2 pl-10 pr-4 bg-[#3A4563] text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute left-3 top-2 text-gray-400" size={20} />
      </div>

      {/* Icons */}
      <div className="flex space-x-6 text-white">
        <FaEnvelope className="cursor-pointer hover:text-gray-400" size={20} />
        <FaBell className="cursor-pointer hover:text-gray-400" size={20} />
        <FaCog className="cursor-pointer hover:text-gray-400" size={20} onClick={(e) => {
          router.push('/profile-settings');
          e.preventDefault();
        }} />
      </div>
    </header>
  );
};
