"use client";
import React, { useState } from "react";
import { FiMessageSquare, FiInbox, FiMinus, FiX } from "react-icons/fi";
import Image from "next/image";

interface Message {
  sender: string;
  text: string;
  time: string;
}

const mockMessages = [
  { sender: "student1", text: "Hey, how are you?", time: "12:00 PM" },
  {
    sender: "student2",
    text: "I'm good, thanks! How about you?",
    time: "12:01 PM",
  },
  {
    sender: "student1",
    text: "Doing well! Just finishing an assignment.",
    time: "12:02 PM",
  },
];

const friendsList = [
  { label: "student1", value: "student1", image: "/student1.png" },
  { label: "student2", value: "student2", image: "/student2.png" },
  { label: "student3", value: "student3", image: "/student3.png" },
];

const StudentCommunication: React.FC = () => {
  const [conversationUser, setConversationUser] = useState("student1");
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleUserClick = (userName: string) => {
    setConversationUser(userName);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const message: Message = {
      sender: conversationUser,
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Left Sidebar with Friends List */}
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <div className="flex items-center mb-6">
          <button className="flex flex-col items-center relative mr-6">
            <FiMessageSquare size={24} />
            <span className="text-sm">Unread</span>
          </button>
          <button className="flex flex-col items-center">
            <FiInbox size={24} />
            <span className="text-sm">Inbox</span>
          </button>
        </div>

        <ul>
          {friendsList.map((friend) => (
            <li
              key={friend.value}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-700"
              onClick={() => handleUserClick(friend.label)}
            >
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-2">
                <Image
                  src={friend.image}
                  alt={friend.label}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
              <div>
                <div className="text-white">{friend.label}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="w-3/4 p-6 bg-gray-800 text-white flex flex-col">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold">
            Conversation with {conversationUser}
          </h2>
          <div className="flex items-center gap-2">
            <button className="p-2">
              <FiMinus size={20} />
            </button>
            <button className="p-2">
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Message List */}
        <div
          className="flex flex-col mt-6 overflow-y-auto flex-grow"
          style={{ maxHeight: "400px" }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-center mb-4 ${
                msg.sender === conversationUser ? "justify-end" : ""
              }`}
            >
              {msg.sender !== conversationUser && (
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-2">
                  <Image
                    src={
                      friendsList.find((f) => f.label === msg.sender)?.image ||
                      "/fallback-image.png"
                    }
                    alt={msg.sender}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </div>
              )}
              <div
                className={`${
                  msg.sender === conversationUser
                    ? "bg-blue-600"
                    : "bg-gray-600"
                } text-${
                  msg.sender === conversationUser ? "white" : "black"
                } p-2 rounded-lg`}
              >
                {msg.text}
              </div>
              <span className="text-gray-800 text-sm ml-2">{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Simple Message Input */}
        <div className="flex mt-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full p-2 bg-gray-700 text-white rounded-l-lg focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentCommunication;
