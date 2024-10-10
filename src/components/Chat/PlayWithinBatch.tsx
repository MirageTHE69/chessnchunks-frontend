"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { FaChessKnight, FaCommentDots, FaTrashAlt } from 'react-icons/fa';

// Define the types for a batchmate
interface Batchmate {
    id: number;
    name: string;
    username: string;
    flag: string;
    online: boolean;
}

const Batchmates: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredBatchmates, setFilteredBatchmates] = useState<Batchmate[]>([]);
    const [batchmates, setBatchmates] = useState<Batchmate[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

    // Raise PR comment
    useEffect(() => {
        const fetchBatchmates = async () => {
            const data: Batchmate[] = [
                { id: 1, name: 'Sakshi Vaidya', username: 'CCstudent1', flag: '🇮🇳', online: true },
                { id: 2, name: 'Rahul Sharma', username: 'SakshiStudent', flag: '🇮🇳', online: false },
                { id: 3, name: 'Sakshi Jain', username: 'ChessMasterSakshi', flag: '🇮🇳', online: true },
                { id: 4, name: 'Arjun Singh', username: 'ArjunSakshi', flag: '🇮🇳', online: true },
            ];
            setBatchmates(data);
            setFilteredBatchmates(data);
        };
        fetchBatchmates();
    }, []);

    // Filter batchmates based on search term
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredBatchmates(batchmates);
        } else {
            setFilteredBatchmates(
                batchmates.filter(batchmate =>
                    batchmate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    batchmate.username.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, batchmates]);

    return (
        <div className="flex flex-col p-6 bg-gray-900 min-h-screen text-white">
            <div className="w-full max-w-4xl mx-auto relative">
                <input
                    type="text"
                    placeholder="Find your batchmates"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded placeholder-gray-400"
                />

                {/* Suggestions Dropdown */}
                {showSuggestions && searchTerm && (
                    <div className="absolute bg-gray-800 border border-gray-700 rounded mt-1 w-full max-w-4xl text-gray-400 z-10">
                        {filteredBatchmates.map((batchmate) => (
                            <div
                                key={batchmate.id}
                                className="p-2 hover:bg-gray-700 cursor-pointer"
                                onMouseDown={() => {
                                    setSearchTerm(batchmate.username);
                                    setShowSuggestions(false);
                                }}
                            >
                                {batchmate.name} ({batchmate.username})
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-4">Batchmates</h2>
                    {filteredBatchmates.map((batchmate) => (
                        <div key={batchmate.id} className="flex items-center justify-between mb-4 p-4 bg-gray-800 rounded">
                            <div className="flex items-center">
                                {/* Profile Picture */}
                                <div className="relative mr-4">
                                    <Image
                                        src="/image.png"
                                        alt="Profile"
                                        className="w-16 h-16 rounded-full"
                                        width={64} 
                                        height={64} 
                                    />
                                    {batchmate.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full"></span>}
                                </div>

                                {/* Batchmate Info */}
                                <div>
                                    <div className="font-semibold flex items-center">
                                        {batchmate.username} <span className="ml-2">{batchmate.flag}</span>
                                    </div>
                                    <p className="text-sm text-gray-400">{batchmate.name}</p>
                                </div>
                            </div>

                            {/* Options */}
                            <div className="flex space-x-3 text-gray-400">
                                <button className="hover:text-white" title="Challenge">
                                    <FaChessKnight />
                                </button>
                                <button className="hover:text-white" title="Message">
                                    <FaCommentDots />
                                </button>
                                <button className="hover:text-white" title="Unfriend">
                                    <FaTrashAlt />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Batchmates;
