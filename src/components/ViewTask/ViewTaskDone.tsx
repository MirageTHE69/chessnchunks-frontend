import React from 'react';
import { FaCheckCircle, FaChess, FaTimesCircle } from 'react-icons/fa';

const ViewTaskStudent = () => {
    return (
        <div className="min-h-screen p-8 bg-gray-900 text-white flex">

            {/* Left Section */}
            <div className="w-2/3 pr-8">
                {/* Header Section */}
                <h1 className="text-2xl font-bold mb-4">Hi CCstudent!</h1>
                <p className="text-gray-400 mb-8">Today is Monday, 22nd January 2027</p>

                {/* Task Cards Section */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <TaskCard
                        title="Homework"
                        image="/Group 22.png"
                        tasksCompleted="08 tasks | 92%"
                        percentage={92}
                    />
                    <TaskCard
                        title="Puzzles"
                        image="/Group 22.png"
                        tasksCompleted="08 tasks | 75%"
                        percentage={75}
                    />
                    <TaskCard
                        title="Quiz"
                        image="/Group 22.png"
                        tasksCompleted="08 tasks | 60%"
                        percentage={60}
                    />
                </div>

                {/* Schedule Section */}
                <div className="bg-gray-800 p-6 rounded-lg mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Schedule</h2>
                        <button className="bg-blue-500 text-white px-3 py-2 rounded text-sm">Edit Schedule</button>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        <ScheduleItem time="8:00 AM" activity="Puzzles" />
                        <ScheduleItem time="9:00 AM" activity="Homework" />
                        <ScheduleItem time="10:00 AM" activity="Quiz" />
                        <ScheduleItem time="11:00 AM" activity="Match" />
                        <ScheduleItem time="12:00 PM" activity="Puzzles" />
                        <ScheduleItem time="1:00 PM" activity="Homework" />
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-1/3">
                {/* Overall Progress Section */}
                <div className="bg-gray-800 p-6 rounded-lg mb-8">
                    <h2 className="text-xl font-bold mb-4">Overall Progress</h2>
                    <div className="flex items-center justify-between mb-8">
                        <div className="bg-gray-900 p-4 rounded-lg w-1/2">
                            <ProgressCircle percentage={90} />
                            <p className="text-center mt-2 text-sm">Daily Plan</p>
                        </div>
                        <div className="space-y-4 w-1/2">
                            {/* Task Short Cards */}
                            <ShortTaskCard label="ID" color="bg-red-500" description="6 puzzles assigned by coach" />
                            <ShortTaskCard label="ID" color="bg-green-500" description="4 quizzes assigned by coach" />
                        </div>
                    </div>

                    {/* 10 Tasks Today Section */}
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-bold">10 tasks today</h3>
                        <p className="text-blue-400 cursor-pointer">View all</p>
                    </div>

                    <div className="space-y-4">
                        <TaskItem
                            task="Complete the 5 puzzles assigned by coach"
                            //@ts-ignore
                            time="Assigned by: Nihano000"
                            statusIcon={<FaCheckCircle className="text-green-500" />}
                            iconBg="bg-green-500"
                        />
                        <TaskItem
                            task="Complete the 4 puzzles assigned by coach"
                            //@ts-ignore
                            time="Assigned by: Nihano000"
                            statusIcon={<FaTimesCircle className="text-red-500" />}
                            iconBg="bg-red-500"
                        />
                    </div>

                    {/* Matches in Next 2 Hours Section */}
                    <div className="mt-6">
                        <h3 className="text-sm font-bold">Matches in next 2 hours</h3>

                        <div className="space-y-4">
                            <TaskItem
                                task="10:00 AM"
                                description="knockout vs. jed8088"
                                icon={<FaChess />}
                                iconBg="bg-peach-500"
                            />
                            <TaskItem
                                task="11:00 AM"
                                description="knockout vs. jed8088"
                                icon={<FaChess />}
                                iconBg="bg-green-500"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

/* TaskCard Component */
const TaskCard = ({ title, image, tasksCompleted, percentage }:any) => (
    <div className="bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 p-4 rounded-lg shadow relative">
        {/* Image at top left */}
        <img src={image} alt={title} className="w-10 h-10 absolute top-4 left-4" />
        {/* Title */}
        <h4 className="text-lg font-bold text-black">{title}</h4>
        {/* Task details */}
        <p className="text-sm text-gray-600 mb-4">{tasksCompleted}</p>
        {/* Progress Bar */}
        <div className="bg-gray-300 rounded-full h-2.5 w-full">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
        </div>
    </div>
);

/* ProgressCircle Component */
const ProgressCircle = ({ percentage }:any) => (
    <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center">
        <div className="text-blue-500 text-2xl font-bold">{percentage}%</div>
    </div>
);

/* ScheduleItem Component */
const ScheduleItem = ({ time, activity }:any) => (
    <div className="bg-gray-900 p-2 rounded-lg flex justify-between">
        <p className="text-gray-400">{time}</p>
        <p className="text-white">{activity}</p>
    </div>
);

/* ShortTaskCard Component */
const ShortTaskCard = ({ label, color, description }:any) => (
    <div className="flex justify-between items-center bg-gray-700 p-2 rounded">
        <p className="text-xs text-white">{description}</p>
        <span className={`px-2 py-1 rounded-full text-xs text-white ${color}`}>{label}</span>
    </div>
);

/* TaskItem Component */
const TaskItem = ({ task, description, icon, iconBg }:any) => (
    <div className="flex justify-between items-center bg-gray-900 p-2 rounded-lg">
        <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${iconBg}`}>
                {icon}
            </div>
            <div>
                <p className="text-white">{task}</p>
                <p className="text-gray-400 text-xs">{description}</p>
            </div>
        </div>
    </div>
);

export default ViewTaskStudent;
