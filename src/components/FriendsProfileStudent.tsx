import Image from 'next/image';
import React from 'react';
import ReactCountryFlag from "react-country-flag";
import { BsPuzzle } from 'react-icons/bs';
import { FaChess } from 'react-icons/fa6';
import { GoBook } from 'react-icons/go';
import { TiUser } from 'react-icons/ti';

const FriendsProfileStudent = () => {
    const games = [
        { players: 'CCstudent 🇮🇳 vs CCstudent2 🇺🇸', result: '0-1', accuracy1: '50.3', accuracy2: '53.5', moves: '20', date: '18th Sep 2024' },
        { players: 'CCstudent 🇮🇳 vs CCstudent2 🇺🇸', result: '0-1', accuracy1: '50.3', accuracy2: '53.5', moves: '20', date: '18th Sep 2024' },
        { players: 'CCstudent 🇮🇳 vs CCstudent2 🇺🇸', result: '1-0', accuracy1: '50.3', accuracy2: '53.5', moves: '20', date: '18th Sep 2024' },
        { players: 'CCstudent 🇮🇳 vs CCstudent2 🇺🇸', result: '1-0', accuracy1: '50.3', accuracy2: '53.5', moves: '20', date: '18th Sep 2024' },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto p-6">
                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Section: Profile and Games */}
                    <div className="col-span-2">
                        {/* Profile Section */}
                        <div className="bg-gray-800 p-6 rounded-lg mb-6 relative">
                            <div className="flex items-center space-x-4">
                                <Image
                                    src="/image.png"
                                    alt="Profile"
                                    className="w-16 h-16 rounded-full"
                                    width={64} // Ensure this matches the width of your image (16 * 4 for the default w-16 class)
                                    height={64} // Ensure this matches the height of your image (16 * 4 for the default w-16 class)
                                />
                                <div>
                                    <h2 className="text-white text-xl font-bold">CCstudent</h2>
                                    <p className="text-gray-400">Sakshi Vaidya</p>
                                </div>
                                {/* Positioned to the right */}
                                <div className="absolute right-6 top-6 text-gray-400 text-sm text-right">
                                    <p>Joined 2nd September 2024</p>
                                    <p>• 17 hours ago</p>
                                </div>
                            </div>

                            <div className="flex mt-4 space-x-4">
                                <button className="bg-gray-600 text-white px-4 py-2 rounded-md">
                                    Challenge
                                </button>
                                <button className="bg-gray-600 text-white px-4 py-2 rounded-md">
                                    Message
                                </button>
                                <button className="bg-gray-600 text-white px-4 py-2 rounded-md">
                                    Remove Friend
                                </button>
                            </div>
                        </div>


                        {/* Completed Games Heading */}
                        <div className="bg-gray-700 p-3 rounded-t-lg text-lg font-semibold mb-1">
                            Completed Games
                        </div>

                        {/* Completed Games Table */}
                        <div className="bg-gray-800 text-white p-6 rounded-lg">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="text-left bg-gray-700">
                                        <th className="p-2">Players</th>
                                        <th className="p-2 text-center">Result</th>
                                        <th className="p-2">Accuracy</th>
                                        <th className="p-2">Moves</th>
                                        <th className="p-2">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {games.map((game, index) => (
                                        <tr key={index} className="border-b border-gray-700">
                                            {/* Players Column */}
                                            <td className="p-2">
                                                <div className="flex flex-col space-y-1">
                                                    {/* Player 1 */}
                                                    <div className="flex items-center space-x-2">
                                                        <TiUser />
                                                        <span>CCstudent</span>
                                                        <div className="flex flex-col items-center">
                                                            <ReactCountryFlag countryCode="IN" svg style={{ width: '1.5em', height: '1.5em' }} />
                                                        </div>
                                                    </div>
                                                    {/* Player 2 */}
                                                    <div className="flex items-center space-x-2">
                                                        <TiUser />
                                                        <span>CCstudent2</span>
                                                        <div className="flex flex-col items-center">
                                                            <ReactCountryFlag countryCode="US" svg style={{ width: '1.5em', height: '1.5em' }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Result Column */}
                                            <td className="p-2">
                                                <div className="flex flex-col items-center justify-center">
                                                    {/* Player 1 Result */}
                                                    <div className="flex items-center space-x-1">
                                                        <span>{game.result.split('-')[0]}</span>
                                                    </div>

                                                    {/* Result Circle - Vertically between Player 1 and Player 2 with Left Margin */}
                                                    <div className="my-2 ml-8">
                                                        {game.result === '1-0' ? (
                                                            <span className="text-green-500">&#x25CF;</span> // Green filled circle for player 1 win
                                                        ) : (
                                                            <span className="text-red-500">&#x25CB;</span> // Red outlined circle for player 2 win
                                                        )}
                                                    </div>

                                                    {/* Player 2 Result */}
                                                    <div className="flex items-center space-x-1">
                                                        <span>{game.result.split('-')[1]}</span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Accuracy Column */}
                                            <td className="p-2">
                                                {game.accuracy1} / {game.accuracy2}
                                            </td>

                                            {/* Moves Column */}
                                            <td className="p-2">{game.moves}</td>

                                            {/* Date Column */}
                                            <td className="p-2">{game.date}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>


                    </div>

                    {/* Right Section: Stats Sidebar */}
                    <div className="space-y-6">
                        {/* Trophy Section */}
                        <div className="bg-gray-800 text-white p-6 rounded-lg text-center">
                            <img
                                src="/gridicons_trophy.png"
                                alt="Trophy"
                                className="w-12 h-12 mx-auto mb-2"
                            />
                            <span className="text-xl font-bold">LEVEL 2</span>
                            <p className="text-sm text-gray-400">Beginner</p>
                        </div>

                        {/* Stats Section */}
                        <div className="bg-gray-800 text-white p-6 rounded-lg">
                            <div className="text-lg font-bold mb-4">Stats</div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-2">
                                        <FaChess />
                                        <span>Games</span>
                                    </div>
                                    <span>1</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-2">
                                        <BsPuzzle />
                                        <span>Puzzles</span>
                                    </div>
                                    <span>1</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-2">
                                        <GoBook />
                                        <span>Lessons</span>
                                    </div>
                                    <span>1</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FriendsProfileStudent;
