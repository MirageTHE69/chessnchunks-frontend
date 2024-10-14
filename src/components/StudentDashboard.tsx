import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaChess } from "react-icons/fa";

// Data for battles
interface Battle {
  opponent: string;
  result: string;
  accuracy: number;
}

const battles: Battle[] = [
  { opponent: "Suresh Malhotra", result: "🏆", accuracy: 83.23 },
  { opponent: "Mukesh Singhania", result: "🏆", accuracy: 73.23 },
  { opponent: "Ramesh Patel", result: "🚩", accuracy: 53.23 },
  { opponent: "Kamlesh Joshi", result: "🏆", accuracy: 63.23 },
  { opponent: "Magnus Carlson", result: "🏆", accuracy: 93.23 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 text-white pb-32">
      {/* Top Section */}
      <div className="grid grid-cols-4 gap-6 mb-10">
        <div className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Image
            src="/gridicons_trophy.png"
            alt="Trophy Icon"
            width={40}
            height={40}
            className="object-contain"
          />
          <div className="flex flex-col">
            <p className="text-lg font-semibold">Rank</p>
            <p className="text-3xl font-bold">47</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Image
            src="/flat-color-icons_puzzle.png"
            alt="Puzzle Icon"
            width={40}
            height={40}
            className="object-contain"
          />
          <div className="flex flex-col">
            <p className="text-lg font-semibold">Puzzles</p>
            <p className="text-3xl font-bold">253</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Image
            src="/octicon_goal-16.png"
            alt="Goals Icon"
            width={40}
            height={40}
            className="object-contain"
          />
          <div className="flex flex-col">
            <p className="text-lg font-semibold">Goals Achieved</p>
            <p className="text-3xl font-bold">5</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Image
            src="/ph_play-fill.png"
            alt="Lessons Icon"
            width={40}
            height={40}
            className="object-contain"
          />
          <div className="flex flex-col">
            <p className="text-lg font-semibold">Lessons</p>
            <p className="text-3xl font-bold">6</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Side - Last 5 Battles */}
        <div className="col-span-1">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow mb-10">
            <h2 className="text-xl font-bold mb-6">Last 5 Battles</h2>
            <table className="w-full text-left text-sm">
              <thead>
                <tr>
                  <th className="pb-2">Opponent</th>
                  <th className="pb-2">Result</th>
                  <th className="pb-2">Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {battles.map((battle, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-700 hover:bg-gray-800 transition-colors"
                  >
                    <td className="py-2">{battle.opponent}</td>
                    <td className="py-2">{battle.result}</td>
                    <td className="py-2">{battle.accuracy}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Overall Ratings */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center">
            <h2 className="text-xl font-bold mb-6">Overall Ratings</h2>
            <div className="grid grid-cols-2 gap-6 mb-6">
              {[
                { label: "AI", rating: 1607, bgColor: "bg-yellow-500" },
                { label: "Academy", rating: 4524, bgColor: "bg-teal-500" },
                { label: "Batch", rating: 4561, bgColor: "bg-blue-500" },
                { label: "Friends", rating: 5234, bgColor: "bg-green-500" },
              ].map((rating, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center justify-center ${rating.bgColor} text-white rounded-full shadow-md p-4`}
                  style={{ width: "80px", height: "80px" }}
                >
                  <p className="text-2xl font-bold">{rating.rating}</p>
                  <p className="text-sm">{rating.label}</p>
                </div>
              ))}
            </div>
            <div
              className="flex flex-col items-center justify-center bg-red-500 p-6 text-white rounded-full shadow-md"
              style={{ width: "100px", height: "100px" }}
            >
              <p className="text-2xl font-bold">5892</p>
              <p className="text-sm">Online</p>
            </div>
          </div>
        </div>

        {/* Right Side - Vertical Button Layout */}
        <div className="col-span-2 bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center relative">
          <h2 className="text-xl font-bold mb-6">
            Ready to Play? Pick Your Match!
          </h2>
          <div className="flex flex-col space-y-4 w-full items-center">
            {[
              { name: "AI", href: "/ai" },
              { name: "Academy", href: "/academy" },
              { name: "Batch", href: "/view-tasks" },
              { name: "Friends", href: "/friends" },
              { name: "Online", href: "/online" },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="bg-gray-700 py-4 w-48 rounded-full text-white text-lg text-center hover:bg-gray-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Central "Choose Your Battle" Button */}
          <div className="mt-8">
            <button
              className="bg-gray-700 py-4 px-6 rounded-lg flex items-center space-x-2 text-white text-lg hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 transition-colors"
              onClick={() => console.log("Choose Your Battle clicked!")}
            >
              <FaChess className="text-white text-3xl" />
              <p>Choose Your Battle</p>
            </button>
          </div>

          {/* View More Button */}
          <button className="absolute bottom-4 right-4 bg-blue-700 px-4 py-2 rounded text-white text-sm hover:bg-blue-600 transition duration-300">
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
