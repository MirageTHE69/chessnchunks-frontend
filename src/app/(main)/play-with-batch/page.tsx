import React from "react";
import { PageHeader } from "@/components/page-header";
import { FaChess, FaComments, FaMinusCircle, FaBan } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const friends = [
  {
    id: 1,
    name: "CCstudent",
    fullName: "Sakshi Vaidya",
    countryFlag: "🇮🇳",
    isOnline: true,
  },
  {
    id: 2,
    name: "CCstudent",
    fullName: "Sakshi Vaidya",
    countryFlag: "🇮🇳",
    isOnline: false,
  },
  {
    id: 3,
    name: "CCstudent",
    fullName: "Sakshi Vaidya",
    countryFlag: "🇮🇳",
    isOnline: true,
  },
  {
    id: 4,
    name: "CCstudent",
    fullName: "Sakshi Vaidya",
    countryFlag: "🇮🇳",
    isOnline: false,
  },
];

const PricingTablePage: React.FC = () => {
  return (
    <div className="w-full min-h-screen p-8  text-white">
      {/* Page Header */}
      <PageHeader title="Play with Batch" />

      <div className="mt-8">
        {/* Friends Section */}
        <div className="bg-[#1B2A41] p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Friends</h2>
          <div className="space-y-4">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="flex justify-between items-center bg-[#132032] p-4 rounded-lg"
              >
                {/* Left Section: Avatar and Info */}
                <div className="flex items-center space-x-4">
                  <Image
                    src={`/avatar-${friend.id}.png`} // Placeholder for avatar image
                    alt={friend.fullName}
                    width={48} // Set the width in pixels (12 * 4, since Tailwind's `w-12` is 3rem or 48px)
                    height={48} // Set the height in pixels (12 * 4, since Tailwind's `h-12` is 3rem or 48px)
                    className="rounded-full"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold">{friend.name}</h3>
                      <span>{friend.countryFlag}</span>
                    </div>
                    <p className="text-gray-400">{friend.fullName}</p>
                  </div>
                </div>

                {/* Action Buttons with Icons */}
                <div className="flex items-center space-x-4">
                  {/* Challenge Button */}
                  <button className="flex items-center space-x-1 bg-gray-700 text-gray-300 px-3 py-1 rounded-md">
                    <FaChess />
                    <span>Challenge</span>
                  </button>
                  {/* Message Button */}
                 <Link href="chat-communication"> <button className="bg-gray-700 text-gray-300 px-3 py-1 rounded-md">
                    <FaComments />
                  </button>
                  </Link>
                  {/* Unfriend Button */}
                  <button className="bg-gray-700 text-gray-300 px-3 py-1 rounded-md">
                    <FaMinusCircle />
                  </button>
                  {/* Block Button */}
                  <button className="bg-gray-700 text-gray-300 px-3 py-1 rounded-md">
                    <FaBan />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingTablePage;
