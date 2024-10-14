"use client";
import React, { useState } from "react";
import { FiMessageSquare, FiInbox, FiMinus, FiX } from "react-icons/fi";
import Image from "next/image";
import {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} from "@/api/messageApi";

interface Conversation {
  userId: string;
  name: string;
  image?: string;
  firstName: string;
  lastName: string;
  lastMessage: string;
  lastMessageTime: string;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  createdAt: string;
}

const StudentCommunication: React.FC = () => {
  const [conversationUser, setConversationUser] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const {
    data: conversationsData,
    isLoading: conversationsLoading,
    error: conversationsError,
  } = useGetConversationsQuery({});

  const {
    data: messagesData,
    isLoading: messagesLoading,
    error: messagesError,
  } = useGetMessagesQuery(conversationUser!, {
    skip: !conversationUser,
  });

  const [sendMessage] = useSendMessageMutation();

  const handleUserClick = (userId: string) => {
    setConversationUser(userId);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !conversationUser) return;

    try {
      await sendMessage({
        receiverId: conversationUser,
        content: newMessage,
      }).unwrap();

      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
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

        {conversationsLoading ? (
          <div>Loading conversations...</div>
        ) : conversationsError ? (
          <div>Error loading conversations.</div>
        ) : (
          <ul>
            {conversationsData?.map((conversation: Conversation) => (
              <li
                key={conversation.userId}
                className={`flex items-center p-2 cursor-pointer hover:bg-gray-700 rounded-lg ${
                  conversationUser === conversation.userId ? "bg-gray-700" : ""
                }`}
                onClick={() => handleUserClick(conversation.userId)}
              >
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-2 ">
                  <Image
                    src={conversation.image || "/fallback-image.png"}
                    alt={conversation.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </div>
                <div className="text-white w-full">
                  {conversation.firstName} {conversation.lastName}
                  <div className="text-xs text-gray-300 flex items-center justify-between w-full">
                    <p>{conversation.lastMessage}</p>
                    <p>
                      {new Date(
                        conversation.lastMessageTime
                      ).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="w-3/4 p-6 bg-gray-800 text-white flex flex-col">
        {conversationUser ? (
          <>
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-xl font-semibold">
                Conversation with{" "}
                {
                  conversationsData?.find(
                    (c: Conversation) => c.userId === conversationUser
                  )?.name
                }
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

            <div
              className="flex flex-col mt-6 overflow-y-auto flex-grow"
              style={{ maxHeight: "400px" }}
            >
              {messagesLoading ? (
                <div>Loading messages...</div>
              ) : messagesError ? (
                <div>Error loading messages.</div>
              ) : (
                messagesData?.map((msg: Message) => (
                  <div
                    key={msg.id}
                    className={`flex items-center mb-4 ${
                      msg.senderId === conversationUser ? "justify-end" : ""
                    }`}
                  >
                    {msg.senderId !== conversationUser && (
                      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-2">
                        <Image
                          src={
                            conversationsData?.find(
                              (c: Conversation) => c.userId === msg.senderId
                            )?.image || "/fallback-image.png"
                          }
                          alt={msg.senderName}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      </div>
                    )}
                    <div
                      className={`${
                        msg.senderId === conversationUser
                          ? "bg-blue-600"
                          : "bg-gray-600"
                      } text-white p-2 rounded-lg`}
                    >
                      {msg.content}
                    </div>
                    <span className="text-gray-400 text-sm ml-2">
                      {msg.createdAt
                        ? new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </span>
                  </div>
                ))
              )}
            </div>

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
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCommunication;
