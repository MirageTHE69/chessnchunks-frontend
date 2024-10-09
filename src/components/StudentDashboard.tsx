import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaChess } from "react-icons/fa"; // Import chess icon

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
        <div className="p-6 bg-gray-900 text-white min-h-screen">
            {/* Top Section */}
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


            <div className="grid grid-cols-3 gap-4">
                {/* Left Side - Last 5 Battles */}
                <div className="col-span-1">
                    <div className="bg-gray-800 p-6 rounded-lg mb-8">
                        <h2 className="text-xl font-bold mb-4">Last 5 Battles</h2>
                        <table className="w-full text-left">
                            <thead>
                                <tr>
                                    <th>Opponent</th>
                                    <th>Result</th>
                                    <th>Accuracy</th>
                                </tr>
                            </thead>
                            <tbody>
                                {battles.map((battle, index) => (
                                    <tr key={index} className="border-t border-gray-600">
                                        <td>{battle.opponent}</td>
                                        <td>{battle.result}</td>
                                        <td>{battle.accuracy}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Overall Ratings */}
                    <div className="bg-gray-800 p-6 rounded-lg flex flex-col items-center">
                        <h2 className="text-xl font-bold mb-6">Overall Ratings</h2>

                        {/* Grid container for AI, Academy, Batch, Friends */}
                        <div className="grid grid-cols-2 gap-8 mb-10"> {/* Adjust gap for spacing */}
                            {[
                                { label: "AI", rating: 1607, bgColor: "bg-yellow-500" },
                                { label: "Academy", rating: 4524, bgColor: "bg-teal-500" },
                                { label: "Batch", rating: 4561, bgColor: "bg-blue-500" },
                                { label: "Friends", rating: 5234, bgColor: "bg-green-500" },
                            ].map((rating, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col items-center justify-center ${rating.bgColor} text-white rounded-full`} // Use rounded-full for circular
                                    style={{ width: '80px', height: '80px' }} // Set width and height for equal sizes
                                >
                                    <p className="text-2xl font-bold">{rating.rating}</p>
                                    <p className="text-sm">{rating.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* "Online" rating at the bottom, centered */}
                        <div className="flex flex-col items-center justify-center bg-red-500 p-4 text-white rounded-full" style={{ width: '100px', height: '100px' }}>
                            <p className="text-2xl font-bold">5892</p>
                            <p className="text-sm">Online</p>
                        </div>

                        {/* Button at the center of the circular layout */}
                        {/* <div className="absolute inset-0 flex items-center justify-center">
                            <button className="bg-white text-black p-3 rounded-full text-sm">
                                <img src="/chess_icon.png" alt="Chess Icon" className="w-6 h-6 inline-block mr-2" />
                                Choose Your Battle
                            </button>
                        </div> */}
                    </div>



                </div>

                {/* Right Side - Ready to Play (Circular Battle Selection) */}
                <div className="col-span-2 bg-gray-800 p-6 rounded-lg flex flex-col items-center relative">
                    <h2 className="text-xl font-bold mb-4">Ready to Play? Pick Your Match!</h2>

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
                        <button
                            className="absolute w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-600 transition-colors"
                            onClick={() => {
                                // Add your button click handler logic here
                                console.log('Button clicked!');
                            }}
                            aria-label="Choose Your Battle"
                        >
                            <Link href="/play-with-batch"><FaChess className="text-white text-3xl" />
                            <p className="text-sm mt-1 text-center">Choose<br />Your Battle</p></Link>
                        </button>

                        {/* Buttons for Battle Options */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                            <button className="bg-red-600 p-4 rounded-full text-center text-white">
                                <div>AI</div>
                            </button>
                        </div>

                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                            <button className="bg-teal-600 p-4 rounded-full text-center text-white">
                                <div>Batch</div>
                            </button>
                        </div>

                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                            <button className="bg-yellow-500 p-4 rounded-full text-center text-white">
                                <div>Academy</div>
                            </button>
                        </div>

                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                            <button className="bg-green-500 p-4 rounded-full text-center text-white">
                                <div>Friends</div>
                            </button>
                        </div>

                        <div className="absolute right-0 bottom-0 transform translate-x-2 translate-y-2">
                            <button className="bg-orange-500 p-4 rounded-full text-center text-white">
                                <div>Online</div>
                            </button>
                        </div>
                    </div>

                    {/* Adjusted "View More" Button */}
                    <button className="absolute bottom-4 right-4 bg-blue-700 px-4 py-2 rounded text-white text-sm">
                        View More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
