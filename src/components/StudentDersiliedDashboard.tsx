"use client";
import Image from 'next/image';
import React from 'react';
import { FaChess } from 'react-icons/fa';
import { GiBullseye } from 'react-icons/gi';
import { GrRobot } from 'react-icons/gr';

function StudentDersiliedDashboard() {
    const handleButtonClick = () => {
        // Add your button click handler logic here
        console.log('Button clicked!');
    };
    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen relative">
            {/* Top Section for Trophy Image and Rank */}
            <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="flex items-center space-x-3">
                    <Image
                        src="/gridicons_trophy.png"
                        alt="Trophy Icon"
                        width={40}
                        height={40}
                        className="object-contain"
                    />
                    <div className="flex flex-col">
                        <p className="text-lg font-bold">Rank</p>
                        <p className="text-2xl">47</p>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <Image
                        src="/flat-color-icons_puzzle.png"
                        alt="Puzzle Icon"
                        width={40}
                        height={40}
                        className="object-contain"
                    />
                    <div className="flex flex-col">
                        <p className="text-lg font-bold">Puzzles</p>
                        <p className="text-2xl">253</p>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <Image
                        src="/octicon_goal-16.png"
                        alt="Goals Icon"
                        width={40}
                        height={40}
                        className="object-contain"
                    />
                    <div className="flex flex-col">
                        <p className="text-lg font-bold">Goals Achieved</p>
                        <p className="text-2xl">5</p>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <Image
                        src="/ph_play-fill.png"
                        alt="Lessons Icon"
                        width={40}
                        height={40}
                        className="object-contain"
                    />
                    <div className="flex flex-col">
                        <p className="text-lg font-bold">Lessons</p>
                        <p className="text-2xl">6</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* Left Section - Ready to Play (Circular Battle Selection) */}
                <div className="col-span-1 bg-gray-800 p-6 rounded-lg flex flex-col items-center relative">

                    <div className="relative w-80 h-80 flex items-center justify-center">
                        {/* Chessboard-like background */}
                        <div className="absolute w-full h-full bg-gradient-to-b from-gray-700 to-gray-800 rounded-full">
                            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                                <div className="bg-gray-900"></div>
                                <div className="bg-gray-800"></div>
                                <div className="bg-gray-800"></div>
                                <div className="bg-gray-900"></div>
                            </div>
                        </div>

                        {/* Central Button */}
                        <div className="absolute w-20 h-20 bg-gray-700 rounded-full flex flex-col items-center justify-center z-10 text-white text-center">
                            <button
                                className="absolute w-20 h-20 bg-gray-700 rounded-full flex flex-col items-center justify-center z-10 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-600 transition-colors"
                                onClick={handleButtonClick}
                                aria-label="Choose Your Battle"
                            >
                                <FaChess className="text-3xl" />
                                <p className="text-xs mt-1">Choose<br />Your Battle</p>
                            </button>
                        </div>

                        {/* Buttons for Battle Options */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                            <button className="bg-red-600 w-20 h-20 rounded-full flex items-center justify-center text-white text-xs">AI</button>
                        </div>

                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                            <button className="bg-teal-600 w-20 h-20 rounded-full flex items-center justify-center text-white text-xs">Batch</button>
                        </div>

                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                            <button className="bg-yellow-500 w-20 h-20 rounded-full flex items-center justify-center text-white text-xs">Academy</button>
                        </div>

                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                            <button className="bg-green-500 w-20 h-20 rounded-full flex items-center justify-center text-white text-xs">Friends</button>
                        </div>

                        <div className="absolute right-0 bottom-0 transform translate-x-2 translate-y-2">
                            <button className="bg-orange-500 w-20 h-20 rounded-full flex items-center justify-center text-white text-xs">Online</button>
                        </div>

                    </div>
                </div>

                {/* Right Section - Daily Quiz and Daily Puzzle */}
                <div className="col-span-2 grid grid-cols-2 gap-4">
                    <div className="bg-gray-800 p-6 rounded-lg flex flex-col items-center">
                        <h3 className="text-xl font-bold mb-4">Daily Quiz</h3>
                        {/* Placeholder for the Chessboard image */}
                        <div className="bg-gray-700 h-40 w-full rounded-none flex items-center justify-center relative">
                            <Image
                                src="/chess-move-one.png"
                                alt="Chessboard Quiz"
                                layout="fill" // This makes the image take the full size of the parent
                                objectFit="contain" // This ensures the image maintains its aspect ratio
                            />
                        </div>

                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg flex flex-col items-center">
                        <h3 className="text-xl font-bold mb-4">Daily Puzzle</h3>
                        {/* Placeholder for the Chessboard image */}
                        <div className="bg-gray-700 h-40 w-full rounded-none flex items-center justify-center relative">
                            <Image
                                src="/chess-move-two.png"
                                alt="Chessboard Quiz"
                                layout="fill" // This makes the image take the full size of the parent
                                objectFit="contain" // This ensures the image maintains its aspect ratio
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Completed Battles Section */}
            <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Completed Battles</h3>
                <table className="w-full bg-gray-800 rounded-lg text-left">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="p-4">Opponent</th>
                            <th className="p-4">Moves</th>
                            <th className="p-4">Result</th>
                            <th className="p-4">Accuracy</th>
                            <th className="p-4">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-gray-900">
                            <td className="p-4">Suresh Malhotra</td>
                            <td className="p-4">10</td>
                            <td className="p-4">🏆</td>
                            <td className="p-4">83.23%</td>
                            <td className="p-4">5th Sep 2024</td>
                        </tr>
                        <tr className="bg-gray-800">
                            <td className="p-4">Mukesh Singhania</td>
                            <td className="p-4">6</td>
                            <td className="p-4">🏆</td>
                            <td className="p-4">73.23%</td>
                            <td className="p-4">5th Sep 2024</td>
                        </tr>
                        <tr className="bg-gray-900">
                            <td className="p-4">Ramesh Patel</td>
                            <td className="p-4">10</td>
                            <td className="p-4">❌</td>
                            <td className="p-4">53.23%</td>
                            <td className="p-4">5th Sep 2024</td>
                        </tr>
                        <tr className="bg-gray-800">
                            <td className="p-4">Kamlesh Joshi</td>
                            <td className="p-4">11</td>
                            <td className="p-4">🏆</td>
                            <td className="p-4">63.23%</td>
                            <td className="p-4">5th Sep 2024</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Right Sidebar - Overall Ratings */}
            <div className="absolute top-0 right-0 h-full bg-gray-900 p-6 flex flex-col justify-start items-center w-16">
                <h3 className="text-lg font-bold mb-6">Overall Ratings</h3>
                <div className="space-y-6">
                    <div className="flex flex-col items-center relative">
                        <Image
                            src="/Ellipse 49.png"
                            alt="AI Icon"
                            width={50}  // Size of the circle
                            height={50}  // Size of the circle
                            className="object-contain"
                        />
                        <GrRobot
                            className="absolute text-white text-3xl top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        />
                        <p className="font-bold text-xs">AI</p>
                        <p className="text-xs">1607</p>
                    </div>



                    <div className="flex flex-col items-center relative">
                        <Image
                            src="/Ellipse 51.png"
                            alt="Academy Icon"
                            width={50}  // Adjust size as needed
                            height={50}  // Adjust size as needed
                            className="object-contain"
                        />
                        <GiBullseye
                            className="absolute text-white text-3xl top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        />
                        <p className="font-bold text-xs">Academy</p>
                        <p className="text-xs">4524</p>
                    </div>

                    <div className="flex flex-col items-center relative">
                        <Image
                            src="/Ellipse 53.png"
                            alt="Online Icon"
                            width={50}  // Adjust size as needed
                            height={50}  // Adjust size as needed
                            className="object-contain"
                        />
                        <GiBullseye
                            className="absolute text-white text-3xl top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        />
                        <p className="font-bold text-xs">Online</p>
                        <p className="text-xs">5892</p>
                    </div>

                    <div className="flex flex-col items-center relative">
                        <Image
                            src="/Ellipse 49.png"
                            alt="Batch Icon"
                            width={50}  // Adjust size as needed
                            height={50}  // Adjust size as needed
                            className="object-contain"
                        />
                        <GrRobot
                            className="absolute text-white text-3xl top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        />
                        <p className="font-bold text-xs">Batch</p>
                        <p className="text-xs">4561</p>
                    </div>

                    <div className="flex flex-col items-center relative">
                        <Image
                            src="/Ellipse 51.png"
                            alt="Friends Icon"
                            width={50}  // Adjust size as needed
                            height={50}  // Adjust size as needed
                            className="object-contain"
                        />
                        <GrRobot
                            className="absolute text-white text-3xl top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        />
                        <p className="font-bold text-xs">Friends</p>
                        <p className="text-xs">5234</p>
                    </div>

                </div>
            </div>



        </div>
    );
}

export default StudentDersiliedDashboard;
