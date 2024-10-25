"use client";
import React, { useEffect, useState } from "react";
import { FiMessageSquare, FiInbox, FiMinus, FiX } from "react-icons/fi";
import Select from "react-select";
import { io } from "socket.io-client";
import { useSession } from "next-auth/react";
import { useFetchBatchForOptionsQuery } from "@/api/batchApi";
import { useLazyFetchAllStudentsQuery } from "@/api/studentApi";
import {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} from "@/api/messageApi";
import { Student, Message } from "@/types";
import Image from "next/image";

interface Conversation {
  userId: string;
  name: string;
  image?: string;
  firstName: string;
  lastName: string;
  lastMessage: string;
  lastMessageTime: string;
}

const CoachCommunication: React.FC = () => {
  const [conversationUser, setConversationUser] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [selectedBatch, setSelectedBatch] = useState<any>(null);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const { data: session } = useSession();

  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

  const { data: batchesData, isLoading: batchesLoading } =
    useFetchBatchForOptionsQuery({});

  const activeConversationUser = selectedStudent
    ? selectedStudent.value
    : conversationUser;

  const { data: messageHistory, refetch: refetchMessages } =
    useGetMessagesQuery(activeConversationUser!, {
      skip: !activeConversationUser,
    });

  console.log("SELECTED STUDENT", selectedStudent);

  const {
    data: conversationsData,
    isLoading: conversationsLoading,
    error: conversationsError,
  } = useGetConversationsQuery({});

  useEffect(() => {
    if (messageHistory) {
      setMessages(messageHistory);
    }
  }, [messageHistory]);

  const [
    fetchAllStudents,
    {
      data: studentsData,
      isLoading: studentsLoading,
      isFetching: studentsFetching,
    },
  ] = useLazyFetchAllStudentsQuery();

  const handleBatchChange = (selected: any) => {
    setSelectedBatch(selected);
    setSelectedStudent(null);
    setConversationUser(null);
    if (selected) {
      fetchAllStudents(selected.value);
    }
  };

  const handleStudentChange = (selected: any) => {
    setSelectedStudent(selected);
    if (selected) {
      setConversationUser(selected.label);
      setMessages([]);
    }
  };

  useEffect(() => {
    if (selectedStudent && session?.accessToken) {
      const socket = io("http://localhost:5000", {
        auth: {
          token: session.accessToken,
        },
      });

      socket.on("receiveMessage", (message: Message) => {
        if (
          (message.senderId === selectedStudent.value &&
            message.receiverId === session?.user?.id) ||
          (message.senderId === session?.user?.id &&
            message.receiverId === selectedStudent.value)
        ) {
          setMessages((prev) => [...prev, message]);
        }
      });

      return () => {
        socket.off("receiveMessage");
        socket.off("disconnect");
        socket.close();
      };
    }
  }, [selectedStudent, session]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !activeConversationUser) return;

    try {
      const messagePayload: Partial<Message> = {
        receiverId: activeConversationUser,
        content: newMessage,
      };

      await sendMessage(messagePayload).unwrap();

      const sentMessage = {
        senderId: session?.user?.id || "coach",
        receiverId: activeConversationUser,
        content: newMessage,
      };
      setMessages((prev) => [...prev, sentMessage]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };
  const selectStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "#2d3748",
      borderColor: "#4a5568",
      color: "white",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#4a5568" : "#2d3748",
      color: "white",
      "&:hover": { backgroundColor: "#4a5568" },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "white",
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: "#4a5568",
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: "white",
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: "white",
      ":hover": {
        backgroundColor: "#e53e3e",
        color: "white",
      },
    }),
  };

  const studentOptions = studentsData
    ? studentsData.map((student: Student) => ({
        label: `${student.profile.firstName} ${student.profile.lastName}`,
        value: student.id,
      }))
    : [];

  const conversationOptions = conversationsData
    ? conversationsData.map((conversation: Conversation) => ({
        label: `${conversation.firstName} ${conversation.lastName}`,
        value: conversation.userId,
        image: conversation.image || "/fallback-image.png",
        lastMessage: conversation.lastMessage,
        lastMessageTime: conversation.lastMessageTime,
      }))
    : [];

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-800 p-4 overflow-y-auto">
        {/* Action Buttons */}
        <div className="flex items-center mb-6 space-x-6">
          <button
            aria-label="Unread messages"
            className="flex items-center text-gray-400 hover:text-white transition duration-300"
          >
            <FiMessageSquare size={24} />
            <span className="ml-2 text-lg">Unread</span>
          </button>
          <button
            aria-label="Inbox messages"
            className="flex items-center text-gray-400 hover:text-white transition duration-300"
          >
            <FiInbox size={24} />
            <span className="ml-2 text-lg">Inbox</span>
          </button>
        </div>

        {/* Batch Selector */}
        <Select
          options={
            batchesData
              ? batchesData.map((batch: any) => ({
                  label: batch.batchCode,
                  value: batch.id,
                }))
              : []
          }
          value={selectedBatch}
          onChange={handleBatchChange}
          placeholder={batchesLoading ? "Loading batches..." : "Select Batch"}
          styles={selectStyles}
          isLoading={batchesLoading}
          className="mb-4"
        />

        {/* Student Selector */}
        <Select
          options={studentOptions}
          value={selectedStudent}
          onChange={handleStudentChange}
          placeholder={
            selectedBatch
              ? studentsLoading || studentsFetching
                ? "Loading students..."
                : "Select Student"
              : "Select a batch first"
          }
          styles={selectStyles}
          isMulti={false}
          isDisabled={!selectedBatch || studentsLoading || studentsFetching}
          isLoading={studentsLoading || studentsFetching}
          className="mb-6"
        />

        {/* Conversations List */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Conversations</h3>
          {conversationsLoading ? (
            <div>Loading conversations...</div>
          ) : conversationsError ? (
            <div>Error loading conversations.</div>
          ) : conversationsData && conversationsData.length > 0 ? (
            <ul>
              {conversationsData.map((conversation: Conversation) => (
                <li
                  key={conversation.userId}
                  className={`flex items-center p-2 cursor-pointer hover:bg-gray-700 rounded-lg ${
                    conversationUser === conversation.userId
                      ? "bg-gray-700"
                      : ""
                  }`}
                  onClick={() => setConversationUser(conversation.userId)}
                >
                  <div className="bg-blue-500 text-white rounded-full h-8 w-8 p-2 flex items-center justify-center  mr-2">
                    {conversation.firstName && conversation?.lastName
                      ? `${conversation?.firstName.charAt(
                          0
                        )}${conversation?.lastName.charAt(0)}`.toUpperCase()
                      : conversation?.firstName
                      ? conversation?.firstName.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                  <div className="text-white w-full">
                    {conversation.firstName} {conversation.lastName}
                    <div className="text-xs text-gray-300 flex items-center justify-between w-full">
                      <p>{conversation.lastMessage}</p>
                      <p>
                        {conversation.lastMessageTime
                          ? new Date(
                              conversation.lastMessageTime
                            ).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })
                          : ""}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div>No conversations found.</div>
          )}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="w-3/4 p-6 bg-gray-800 flex flex-col">
        {conversationUser ? (
          <>
            {/* Chat Header */}
            <header className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
              <h2 className="text-2xl font-semibold">
                Conversation with{" "}
                {`${
                  conversationsData?.find(
                    (c: Conversation) => c.userId === conversationUser
                  )?.firstName
                } ${
                  conversationsData?.find(
                    (c: Conversation) => c.userId === conversationUser
                  )?.lastName
                }`}
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  aria-label="Minimize chat"
                  className="p-2 text-gray-400 hover:text-white transition duration-300"
                >
                  <FiMinus size={20} />
                </button>
                <button
                  aria-label="Close chat"
                  className="p-2 text-gray-400 hover:text-white transition duration-300"
                  onClick={() => setConversationUser(null)}
                >
                  <FiX size={20} />
                </button>
              </div>
            </header>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto space-y-4">
              {messages.length === 0 ? (
                <div>No messages yet. Start the conversation!</div>
              ) : (
                messages.map((msg: Message) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.senderId === session?.user?.id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {msg.senderId !== session?.user?.id && (
                      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-2">
                        <Image
                          src={
                            conversationsData?.find(
                              (c: Conversation) => c.userId === msg.senderId
                            )?.image || "/fallback-image.png"
                          }
                          alt={"1"}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      </div>
                    )}
                    <div
                      className={`${
                        msg.senderId === session?.user?.id
                          ? "bg-blue-600"
                          : "bg-gray-600"
                      } text-white p-2 rounded-lg`}
                    >
                      {msg.content}
                    </div>
                    <span className="text-gray-400 text-sm ml-2">
                      {msg.createdAt
                        ? new Date(msg.createdAt).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })
                        : ""}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            <div className="mt-4 flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow px-4 bg-gray-700 rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              <button
                onClick={handleSendMessage}
                disabled={isSending}
                className={`bg-blue-600 p-2 w-1/6 rounded-r-lg text-lg hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300 ${
                  isSending ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSending ? "Sending..." : "Send"}
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl">Select a conversation to start chatting.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CoachCommunication;
