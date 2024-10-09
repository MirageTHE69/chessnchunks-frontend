"use client";
import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { FiInbox, FiEdit, FiSearch, FiMessageSquare, FiMinus, FiX } from 'react-icons/fi';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import Image from 'next/image';

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
                { label: 'kalpesh_patil', value: 'kalpesh_patil', image: 'image.png' },
                { label: 'nihar40000', value: 'nihar40000', image: 'image.png' },
                { label: 'magnus_carlson', value: 'magnus_carlson', image: 'image.png' },
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

    const handleBatchSelectAll = () => {
        setSelectedBatches(selectedBatches.length === batches.length ? [] : batches);
    };
    const isAllSelectedBatches = selectedBatches.length === batches.length;
    const isAllSelectedStudents = selectedStudents.length === students.length;

    const handleStudentSelectAll = () => {
        setSelectedStudents(selectedStudents.length === students.length ? [] : students);
    };

    const handleUserClick = (userName: string) => {
        setConversationUser(userName);
    };

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        const message: Message = {
            sender: conversationUser,
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        const plainTextMessage = newMessage.replace(/<[^>]*>/g, '').trim();
        setMessages([...messages, { ...message, text: plainTextMessage }]);
        setNewMessage('');
    };

    const getLastMessage = (studentName: string) => {
        const studentMessages = messages.filter(msg => msg.sender === studentName);
        return studentMessages.length > 0 ? studentMessages[studentMessages.length - 1].text : "No messages yet";
    };

    // Custom option component for the select dropdown
    const CustomOption = (props: any) => {
        const { innerRef, innerProps, data } = props;
        const studentImage = data.image ? `/${data.image}` : '/fallback-image.png';

        return (
            <div
                ref={innerRef}
                {...innerProps}
                className="flex items-center p-2 cursor-pointer hover:bg-gray-700"
            >
                <Image
                    src={studentImage}
                    alt={data.label}
                    width={32}
                    height={32}
                    className="rounded-full"
                />
                <span className="text-white ml-2">{data.label}</span>
            </div>
        );
    };

    return (
        <div className="flex h-screen bg-gray-900">
            {/* Left Sidebar */}
            <div className="w-1/4 bg-gray-800 text-white p-4">
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

                <ul>
                    {students.map((student) => (
                        <li key={student.value} className="flex items-center p-2 cursor-pointer hover:bg-gray-700" onClick={() => handleUserClick(student.label)}>
                            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-2">
                                <Image
                                    src={student.image ? `/${student.image}` : '/fallback-image.png'}
                                    alt={student.label}
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                />
                            </div>
                            <div>
                                <div className="text-white">{student.label}</div>
                                <div className="text-gray-400 text-sm">{getLastMessage(student.label)}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="w-3/4 p-6 bg-gray-800 text-white flex flex-col">
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

                <div className="flex flex-col mt-6 overflow-y-auto flex-grow" style={{ maxHeight: '400px' }}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-center mb-4 ${msg.sender === conversationUser ? 'justify-end' : ''}`}>
                            {msg.sender !== conversationUser && (
                                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-2">
                                    <Image
                                        src={students.find(s => s.label === msg.sender)?.image
                                            ? `/${students.find(s => s.label === msg.sender)?.image}`
                                            : '/fallback-image.png'}
                                        alt={msg.sender}
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                </div>
                            )}
                            <div className={`bg-${msg.sender === conversationUser ? 'blue-600' : 'gray-300'} text-${msg.sender === conversationUser ? 'white' : 'black'} p-2 rounded-lg`}>
                                {msg.text}
                            </div>
                            <span className="text-gray-400 text-sm ml-2">{msg.time}</span>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className="my-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Batch</label>
                    <Select
                        options={batches}
                        isMulti
                        value={selectedBatches}
                        onChange={(selected) => setSelectedBatches(selected as OptionType[])}
                        placeholder="Select Batch"
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                backgroundColor: '#2d3748',
                                color: 'white',
                                border: '1px solid #4a5568', // Border styling
                                boxShadow: 'none',
                                '&:hover': {
                                    border: '1px solid #a0aec0',
                                },
                            }),
                            menu: (provided) => ({ ...provided, backgroundColor: '#2d3748' }),
                            option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isSelected ? '#4a5568' : '#2d3748',
                                color: 'white',
                            }),
                        }}
                        className="text-white"
                    />
                    <button
                        onClick={handleBatchSelectAll}
                        className="mt-2 p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                    >
                        {isAllSelectedBatches ? 'Deselect All' : 'Select All'}
                    </button>
                </div>

                <div className="my-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Student</label>
                    <Select
                        options={students}
                        isMulti
                        value={selectedStudents}
                        onChange={(selected) => setSelectedStudents(selected as OptionType[])}
                        placeholder="Select Student"
                        components={{ Option: CustomOption }}
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                backgroundColor: '#2d3748',
                                color: 'white',
                                border: '1px solid #4a5568', // Border styling
                                boxShadow: 'none',
                                '&:hover': {
                                    border: '1px solid #a0aec0',
                                },
                            }),
                            menu: (provided) => ({ ...provided, backgroundColor: '#2d3748' }),
                            option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isSelected ? '#4a5568' : '#2d3748',
                                color: 'white',
                            }),
                        }}
                        className="text-white"
                    />
                    <button
                        onClick={handleStudentSelectAll}
                        className="mt-2 p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                    >
                        {isAllSelectedStudents ? 'Deselect All' : 'Select All'}
                    </button>
                </div>

                {/* Rich Text Editor */}
                <div className="flex flex-col mb-4"> {/* Make it a flex column to stack editor and button */}
                    <div className="mb-2"> {/* Add margin bottom for spacing */}
                        <ReactQuill
                            theme="snow"
                            style={{ height: '200px', width: '100%' }} // Keep full width
                            value={newMessage}
                            onChange={setNewMessage}
                        />
                    </div>

                    {/* Send Button */}
                    <button
                        onClick={handleSendMessage}
                        className="bg-blue-600 text-white py-2 px-4 mt-10 rounded hover:bg-blue-500"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommunicationCoach;
