"use client";

import { useFetchAllTasksQuery } from "@/api/taskApi";
import { PageHeader } from "@/components/page-header";
import Image from "next/image";

// Remove the unused 'props' parameter as it's not required right now.
export default function Page() {
  const { data } = useFetchAllTasksQuery({});

  console.log("DATA", data);

  return (
    <div className="w-full min-h-screen p-8 text-white">
      {/* Page Header */}
      <PageHeader title="Hi CCstudent!" />
      <div className="flex justify-between mt-6">
        {/* Left Section (Tasks and Schedule) */}
        <div className="flex flex-col w-3/4 pr-8">
          {/* Task Cards */}
          <div className="flex justify-start space-x-4">
            {["Homework", "Puzzles", "Quiz"].map((task, index) => (
              <div
                key={index}
                className="bg-[#1B2A41] rounded-lg shadow-lg p-4 w-1/4"
              >
                {/* Task Card Header */}
                <div className="flex items-center justify-between mb-4">
                  {/* Team members */}
                  <div className="flex -space-x-2">
                    {Array(4)
                      .fill(0)
                      .map((_, i) => (
                        <Image
                          key={i}
                          src={`/avatar-${i + 1}.svg`} // Ensure avatar images are correctly named
                          alt={`Avatar ${i + 1}`}
                          width={32} // Use width of 32 pixels (8 * 4) for a size of 8 with Next.js Image
                          height={32} // Use height of 32 pixels (8 * 4) for a size of 8 with Next.js Image
                          className="rounded-full border-2 border-[#1B2A41]"
                        />
                      ))}
                  </div>
                  {/* Options */}
                  <div className="text-gray-400">•••</div>
                </div>
                {/* Task Title */}
                <h3 className="text-xl font-semibold mb-2">{task}</h3>
                {/* Task Info */}
                <p className="text-gray-400">08 tasks | 92%</p>
                {/* Progress Bar */}
                <div className="bg-gray-600 rounded-full h-2 mt-4">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "92%" }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Schedule Section */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Schedule</h2>
              <button className="text-blue-500 hover:underline">
                Edit schedule
              </button>
            </div>
            {/* Time Blocks */}
            <div className="bg-[#1B2A41] rounded-lg p-4">
              {[
                { time: "8:00 am", task: "Puzzles" },
                { time: "9:00 am", task: "Homework" },
                { time: "10:00 am", task: "Quiz" },
                { time: "11:00 am", task: "Match" },
                { time: "12:00 pm", task: "Puzzles" },
                { time: "1:00 pm", task: "Homework" },
                { time: "2:00 pm", task: "Quiz" },
              ].map((block, index) => (
                <div
                  key={index}
                  className="flex justify-between py-2 text-gray-400 border-b border-gray-600 last:border-b-0"
                >
                  <span>{block.time}</span>
                  <span className="text-white">{block.task}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section (Overall Progress) */}
        <div className="w-1/4">
          {/* Overall Progress */}
          <div className="bg-[#1B2A41] rounded-lg p-6 mb-4">
            <h3 className="text-2xl font-semibold mb-4">Overall Progress</h3>

            {/* Daily Plan */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-lg font-semibold">Daily Plan</h4>
                <p className="text-gray-400">25 of 30 tasks completed</p>
              </div>
              <div className="text-white text-2xl font-bold">90%</div>
            </div>
            {/* Progress Bar */}
            <div className="bg-gray-600 rounded-full h-2">
              <div
                className="bg-green-400 h-2 rounded-full"
                style={{ width: "90%" }}
              ></div>
            </div>

            <div className="mt-6 flex justify-between">
              <div className="text-white">
                <span className="block font-bold text-xl">11</span>
                <span className="block text-sm">tasks closed today</span>
              </div>
              <div className="text-white">
                <span className="block font-bold text-xl">8</span>
                <span className="block text-sm">hours</span>
              </div>
            </div>
          </div>

          {/* Tasks Today */}
          <div className="bg-[#1B2A41] rounded-lg p-6 mb-4">
            <h4 className="text-xl font-semibold mb-4">
              {data?.length || 0} Tasks today
            </h4>
            <div className="space-y-4">
              {data?.map((el, index) => (
                <div
                  key={index}
                  className="bg-[#132032] p-4 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{el?.description}</p>
                    <p className="text-gray-400 text-sm">
                      Assigned by{" "}
                      {`${el.createdBy?.profile?.firstName} ${el.createdBy?.profile?.lastName}`}
                    </p>
                  </div>
                  <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                    1D
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Matches */}
          <div className="bg-[#1B2A41] rounded-lg p-6">
            <h4 className="text-xl font-semibold mb-4">
              Matches in next 2 hours
            </h4>
            {[
              { time: "10:00 am", match: "knockout vs. joel90898" },
              { time: "11:00 am", match: "knockout vs. joel90898" },
            ].map((match, index) => (
              <div
                key={index}
                className="flex justify-between text-gray-400 mb-4"
              >
                <span>{match.time}</span>
                <span className="text-white">{match.match}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
