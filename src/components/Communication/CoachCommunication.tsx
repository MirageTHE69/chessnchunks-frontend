"use client";
import React, { useEffect, useState } from "react";
import { FiMessageSquare, FiInbox, FiMinus, FiX } from "react-icons/fi";
import Select from "react-select";
import { io } from "socket.io-client";
import { useSession } from "next-auth/react";
import { useFetchBatchForOptionsQuery } from "@/api/batchApi";
import { useLazyFetchAllStudentsQuery } from "@/api/studentApi";
import { useGetMessagesQuery, useSendMessageMutation } from "@/api/messageApi";
import { Message, Student } from "@/types";

const CoachCommunication: React.FC = () => {
  const [conversationUser, setConversationUser] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [selectedBatch, setSelectedBatch] = useState<any>(null);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const { data: session } = useSession();

  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

  // Fetch batches
  const { data: batchesData, isLoading: batchesLoading } =
    useFetchBatchForOptionsQuery({});

  const { data: messageHistory, refetch: refetchMessages } =
    useGetMessagesQuery(selectedStudent?.value, {
      skip: !selectedStudent,
    });

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

      return () => {
        socket.off("disconnect");
        socket.close();
      };
    }
  }, [selectedStudent, session]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedStudent) return;

    try {
      const messagePayload: Partial<Message> = {
        receiverId: selectedStudent.value,
        content: newMessage,
      };

      await sendMessage(messagePayload).unwrap();

      const sentMessage: Message = {
        senderId: session?.user?.id || "coach",
        receiverId: selectedStudent.id,
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

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <aside className="w-1/4 bg-gray-800 p-4">
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
          className="mb-4"
        />
      </aside>

      <main className="w-3/4 p-6 bg-gray-800 flex flex-col">
        {conversationUser ? (
          <>
            <header className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
              <h2 className="text-2xl font-semibold">
                Conversation with {conversationUser}
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
            <div className="flex-grow overflow-y-auto space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.senderId === session?.user?.id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg transition duration-300 ${
                      msg.senderId === session?.user?.id
                        ? "bg-blue-600"
                        : "bg-gray-600"
                    }`}
                  >
                    <p className="text-white">{msg.content}</p>
                  </div>
                  <span className="text-sm text-gray-400 ml-2">
                    {msg.createdAt
                      ? new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </span>
                </div>
              ))}
            </div>
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
            <p className="text-xl">Select a student to start a conversation.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CoachCommunication;
