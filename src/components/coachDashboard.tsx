// components/Dashboard.tsx

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiMessageSquare, FiInbox, FiMinus, FiX } from "react-icons/fi";
import { useFetchBatchForOptionsQuery } from "@/api/batchApi"; // Adjust the path as needed
import {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} from "@/api/messageApi"; // Existing imports
import {
  useFetchAllSeasonalGoalsQuery,
  useFetchAllWeeklyGoalsQuery,
} from "@/api/goalApi";

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

// Data for students
interface Student {
  name: string;
  progress: string;
  status: string;
}

const allStudents: Student[] = [
  { name: "Student 1", progress: "85%", status: "Active" },
  { name: "Student 2", progress: "90%", status: "Active" },
  { name: "Student 3", progress: "75%", status: "Inactive" },
  { name: "Student 4", progress: "80%", status: "Active" },
  { name: "Student 5", progress: "95%", status: "Active" },
  { name: "Student 6", progress: "70%", status: "Inactive" },
  // Add more students as needed
];

const Dashboard: React.FC = () => {
  const [showAllStudents, setShowAllStudents] = useState(false);

  const displayedStudents = showAllStudents
    ? allStudents
    : allStudents.slice(0, 5);

  const {
    data: batchesData,
    isLoading: batchesLoading,
    error: batchesError,
  } = useFetchBatchForOptionsQuery({});

  const {
    data: seasonalGoalsData,
    isLoading: seasonalGoalsLoading,
    error: seasonalGoalsError,
  } = useFetchAllSeasonalGoalsQuery({});

  const {
    data: weeklyGoalsData,
    isLoading: weeklyGoalsLoading,
    error: weeklyGoalsError,
  } = useFetchAllWeeklyGoalsQuery({});

  const seasonalGoalsCount = seasonalGoalsData ? seasonalGoalsData.length : 0;
  const weeklyGoalsCount = weeklyGoalsData ? weeklyGoalsData.length : 0;

  return (
    <div className="p-6 text-white pb-32">
      {/* Top Statistics Section */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {/* Your Batch Rank */}
        <div className="flex items-center space-x-3 bg-gray-800 p-4 rounded-lg">
          <Image
            src="/gridicons_trophy.png"
            alt="Trophy Icon"
            width={40}
            height={40}
            className="object-contain"
          />
          <div className="flex flex-col">
            <p className="text-lg font-bold">No. of Seasonal Goals</p>
            <p className="text-2xl">{seasonalGoalsCount}</p>
          </div>
        </div>

        {/* Your Goal */}
        <div className="flex items-center space-x-3 bg-gray-800 p-4 rounded-lg">
          <Image
            src="/flat-color-icons_puzzle.png"
            alt="Puzzle Icon"
            width={40}
            height={40}
            className="object-contain"
          />
          <div className="flex flex-col">
            <p className="text-lg font-bold">No. of Weekly Goals</p>
            <p className="text-2xl">{weeklyGoalsCount}</p>
          </div>
        </div>

        {/* Your Lesson */}
        <div className="flex items-center space-x-3 bg-gray-800 p-4 rounded-lg">
          <Image
            src="/ph_play-fill.png"
            alt="Lessons Icon"
            width={40}
            height={40}
            className="object-contain"
          />
          <div className="flex flex-col">
            <p className="text-lg font-bold">Your Lesson</p>
            <p className="text-2xl">6</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column: Last 5 Battles */}
        <div className="col-span-1">
          <div className="bg-gray-900 p-4 rounded-lg mb-8">
            <h2 className="text-xl font-bold mb-4">Last 5 Battles</h2>
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
                    <td className="py-1">{battle.opponent}</td>
                    <td className="py-1">{battle.result}</td>
                    <td className="py-1">{battle.accuracy}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Batches and Students */}
        <div className="col-span-1">
          {/* Batches Section */}
          <div className="bg-gray-900 p-4 rounded-lg mb-8">
            <h2 className="text-xl font-bold mb-4">Batches</h2>
            {batchesLoading ? (
              <div>Loading batches...</div>
            ) : batchesError ? (
              <div>Error loading batches.</div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead>
                  <tr>
                    <th className="pb-2">Batch Code</th>
                    <th className="pb-2">Start Date</th>
                    <th className="pb-2">Student Count</th>
                  </tr>
                </thead>
                <tbody>
                  {batchesData?.map((batch) => (
                    <tr
                      key={batch.id}
                      className="border-t border-gray-700 hover:bg-gray-800 transition-colors"
                    >
                      <td className="py-1">{batch.batchCode}</td>
                      <td className="py-1">
                        {new Date(batch.startDate).toLocaleDateString([], {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-1">{batch._count.students}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Coach's Students Section */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Coach's Students</h2>
            <table className="w-full text-left text-sm">
              <thead>
                <tr>
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Progress</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {displayedStudents.map((student, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-700 hover:bg-gray-800 transition-colors"
                  >
                    <td className="py-1">{student.name}</td>
                    <td className="py-1">{student.progress}</td>
                    <td className="py-1">{student.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* View More/Less Button */}
            {allStudents.length > 5 && (
              <button
                className="mt-4 bg-blue-700 px-4 py-2 rounded text-white text-sm hover:bg-blue-600 transition duration-300"
                onClick={() => setShowAllStudents(!showAllStudents)}
                aria-label={
                  showAllStudents ? "View less students" : "View more students"
                }
              >
                {showAllStudents ? "View Less" : "View More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;