"use client"; // This makes sure the component runs on the client side

import { FaEnvelope, FaBell, FaCog, FaSearch } from 'react-icons/fa'; // Icons

type Props = {};

export const Header = (props: Props) => {
  return (
    <header className="w-full bg-gray-900 py-4 px-6 flex justify-between items-center">
      {/* Search Bar */}
      <div className="relative w-64">
        <input
          type="text"
          placeholder="Search..."
          className="w-full py-2 pl-10 pr-4 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute left-3 top-2 text-gray-400" size={20} />
      </div>

      {/* Icons */}
      <div className="flex space-x-6 text-white">
        <FaEnvelope className="cursor-pointer hover:text-gray-400" size={20} />
        <FaBell className="cursor-pointer hover:text-gray-400" size={20} />
        <FaCog className="cursor-pointer hover:text-gray-400" size={20} />
      </div>
    </header>
  );
};
