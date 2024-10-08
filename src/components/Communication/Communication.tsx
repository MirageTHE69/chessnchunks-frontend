"use client";
import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { FiInbox, FiEdit, FiSearch, FiMessageSquare, FiMinus, FiX } from 'react-icons/fi';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import Image from 'next/image'; // Import Image from next/image

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface OptionType {
    label: string;
    value: string;
    image?: string; // Optional image property
}

interface Message {
    sender: string;
    text: string;
    time: string;
}

const mockMessages = [
    { sender: "kalpesh_patil", text: "Hi, how are you?", time: "12:00 PM" },
    { sender: "nihar40000", text: "I'm doing well, thanks! You?", time: "12:01 PM" },
    { sender: "kalpesh_patil", text: "Just working on a project.", time: "12:02 PM" },
    { sender: "magnus_carlson", text: "I am the best!", time: "12:03 PM" },
];

const CommunicationCoach: React.FC = () => {
    const [batches, setBatches] = useState<OptionType[]>([]);
    const [selectedBatches, setSelectedBatches] = useState<OptionType[]>([]);
    const [students, setStudents] = useState<OptionType[]>([]);
    const [selectedStudents, setSelectedStudents] = useState<OptionType[]>([]);
    const [conversationUser, setConversationUser] = useState("kalpesh_patil");
    const [messages, setMessages] = useState<Message[]>(mockMessages);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [unreadCount, setUnreadCount] = useState(3); // Example unread message count

    useEffect(() => {
        const fetchBatches = async () => {
            setBatches([{ label: 'Batch A', value: 'batch_a' }, { label: 'Batch B', value: 'batch_b' }]);
        };
        const fetchStudents = async () => {
            setStudents([
                { label: 'kalpesh_patil', value: 'kalpesh_patil', image: '/images/kalpesh.png' }, // Update with actual image paths
                { label: 'nihar40000', value: 'nihar40000', image: '/images/nihar.png' },
                { label: 'magnus_carlson', value: 'magnus_carlson', image: '/images/magnus.png' },
            ]);
        };
        fetchBatches();
        fetchStudents();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleUserClick = (userName: string) => {
        setConversationUser(userName);
    };

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        const message: Message = {
            sender: "kalpesh_patil",
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages([...messages, message]);
        setNewMessage('');
    };

    // Custom option component for the select dropdown
    const CustomOption: React.FC<{ innerRef: any; innerProps: any; data: OptionType }> = (props) => {
        const { innerRef, innerProps, data } = props;
        return (
            <div
                ref={innerRef}
                {...innerProps}
                className="flex items-center p-2 cursor-pointer hover:bg-gray-700"
            >
                <Image src={data.image || '/images/default.png'} alt={data.label} width={32} height={32} className="rounded-full mr-2" />
                <span className="text-white">{data.label}</span>
            </div>
        );
    };

    return (
        <div className="flex h-screen bg-gray-900">
            {/* Left Sidebar */}
            <div className="w-1/4 bg-gray-800 text-white p-4">
                {/* Inbox and Unread */}
                <div className="flex items-center mb-6">
                    <button className="flex flex-col items-center relative mr-6">
                        <FiMessageSquare size={24} />
                        <span className="text-sm">Unread</span>
                        {unreadCount > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                                {unreadCount}
                            </span>
                        )}
                    </button>
                    <button className="flex flex-col items-center">
                        <FiInbox size={24} />
                        <span className="text-sm">Inbox</span>
                    </button>
                </div>

                {/* Compose and Search Buttons */}
                <div className="flex mb-8">
                    <button className="flex items-center justify-center gap-2 p-3 bg-gray-700 rounded text-white text-sm hover:bg-gray-600 w-full mr-2">
                        <FiEdit size={20} />
                        <span className="font-medium">Compose</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 p-3 bg-gray-700 rounded text-white text-sm hover:bg-gray-600 w-full">
                        <FiSearch size={20} />
                        <span className="font-medium">Search</span>
                    </button>
                </div>

                {/* Chat List */}
                <ul>
                    {students.map((student) => (
                        <li key={student.value} className="flex items-center p-2 cursor-pointer hover:bg-gray-700" onClick={() => handleUserClick(student.label)}>
                            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-2">
                                <Image src={student.image || '/images/default.png'} alt={student.label} width={32} height={32} className="rounded-full" />
                            </div>
                            <div>
                                <div className="text-white">{student.label}</div>
                                <div className="text-gray-400 text-sm">Last message here...</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content */}
            <div className="w-3/4 p-6 bg-gray-800 text-white flex flex-col">
                {/* Conversation Header */}
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-xl font-semibold">Conversation with {conversationUser}</h2>
                    <div className="flex items-center gap-2">
                        <button className="p-2">
                            <FiMinus size={20} />
                        </button>
                        <button className="p-2">
                            <FiX size={20} />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex flex-col mt-6 overflow-y-auto flex-grow" style={{ maxHeight: '400px' }}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-center mb-4 ${msg.sender === conversationUser ? 'justify-end' : ''}`}>
                            {msg.sender !== conversationUser && (
                                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-2">
                                    <Image src={students.find(s => s.label === msg.sender)?.image || '/images/default.png'} alt={msg.sender} width={32} height={32} className="rounded-full" />
                                </div>
                            )}
                            <div className={`bg-${msg.sender === conversationUser ? 'blue-600' : 'gray-300'} text-${msg.sender === conversationUser ? 'white' : 'black'} p-2 rounded-lg`}>
                                {msg.text}
                            </div>
                            <span className="text-gray-400 text-sm ml-2">{msg.time}</span>
                        </div>
                    ))}
                    <div ref={messagesEndRef} /> {/* For scrolling to the bottom */}
                </div>

                <div className="flex-grow flex flex-col gap-4">
                    {/* Select Dropdowns */}
                    <div className="flex flex-col gap-4 mb-4">
                        <Select
                            options={batches}
                            isMulti
                            placeholder="Select Batches..."
                            onChange={(selected) => setSelectedBatches(selected as OptionType[])}
                            className="text-black"
                        />
                        <Select
                            options={students}
                            isMulti
                            placeholder="Select Students..."
                            onChange={(selected) => setSelectedStudents(selected as OptionType[])}
                            className="text-black"
                            components={{ Option: CustomOption }}
                        />
                    </div>

                    {/* Message Input */}
                    <div className="flex items-center">
                        <ReactQuill value={newMessage} onChange={setNewMessage} placeholder="Type your message here..." />
                        <button onClick={handleSendMessage} className="p-2 bg-blue-600 text-white rounded ml-2">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunicationCoach;
