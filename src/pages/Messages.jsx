import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BiSend } from "react-icons/bi";
import { io } from 'socket.io-client';
import DashboardLayout from "../components/DashboadLayouts/DashbordLayout";
import Cookies from "js-cookie";

const PrivateMessages = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [socket, setSocket] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const getTokenFromCookies = () => {
    return Cookies.get("access_token") || "";
  };

  useEffect(() => {
    // Function to fetch contacts based on search query
    const fetchContacts = async () => {
      try {
        const apiUrl = searchQuery
          ? `http://localhost:8000/messages/search?query=${searchQuery}` // New API endpoint for search
          : "http://localhost:8000/messages/chats"; // Default API for all contacts

        const response = await axios.get(apiUrl, {
          withCredentials: true,
        });
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, [searchQuery]); 

  useEffect(() => {
    // Fetch messages when a contact is selected
    const fetchMessages = async () => {
      if (!selectedContact) return;
      setLoadingMessages(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/messages/history?userID2=${selectedContact.user_id}`,
          {
            withCredentials: true,
          }
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching message history:", error);
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchMessages();
  }, [selectedContact]);

  useEffect(() => {
    const token = getTokenFromCookies();
    if (!token) {
      console.error("No token found, cannot establish WebSocket connection.");
      return;
    }
    
    // Establish a socket connection when component mounts
    const newSocket = io("ws://localhost:8000", {
      extraHeaders: { token: token },
    });

    // Set the socket instance in the state
    setSocket(newSocket);

    // Clean up the socket connection on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []); // Empty dependency array to run this effect once

  // Listen for incoming messages directly from the socket
  useEffect(() => {
    if (!socket) return;

    socket.on("receiveMessage", (message) => {
      console.log("Received message: ", message); // For debugging
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage"); // Clean up the listener on unmount
    };
  }, [socket]);

  const handleSendMessage = () => {
    if (messageInput.trim() && socket && selectedContact) {
      const newMessage = {
        receiver_id: selectedContact.user_id,
        message: messageInput,
      };
      socket.emit("sendMessage", newMessage);  // Emit message to the server
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...newMessage, sender: "You", isSent: true },
      ]);
      setMessageInput("");  // Reset message input after sending
    }
  };

  return (
    <DashboardLayout>
      <main className="md:ml-64">
        <div className="flex h-[640px] bg-gray-100">
          {/* Sidebar */}
          <div className="w-1/4 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Chats</h2>
              <div className="relative mt-2">
              <input
                  type="text"
                  placeholder="Search contacts..."
                  className="w-full p-3 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchQuery}  // Controlled input
                  onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 4a7 7 0 100 14 7 7 0 000-14zm0 0V3m0 0h7m-7 0H4"
                    />
                </svg>
                </span>
            </div>
            </div>
            <div className="overflow-y-auto">
              {contacts.map((contact) => (
                <div
                  key={contact.user_id}
                  className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer ${
                    selectedContact?.user_id === contact.user_id ? "bg-gray-50" : ""
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="relative">
                    <img
                      src={contact.user_img}
                      alt={contact.user_name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-semibold">{contact.user_name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Chat Section */}
          <div className="flex-1 flex flex-col">
            {selectedContact ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-white flex items-center">
                  <img
                    src={selectedContact.user_img}
                    alt={selectedContact.user_name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="ml-4 flex-1">
                    <h2 className="text-lg font-semibold">{selectedContact.user_name}</h2>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                  {loadingMessages ? (
                    <p className="text-gray-500 text-center">Loading...</p>
                  ) : messages.length ? (
                    messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.receiver_id === selectedContact.user_id
                            ? "justify-end"
                            : "justify-start"
                        } mb-4`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.receiver_id === selectedContact.user_id
                              ? "bg-blue-500 text-white"
                              : "bg-white text-gray-800"
                          }`}
                        >
                          <p>{message.message}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.receiver_id === selectedContact.user_id
                                ? "text-blue-100"
                                : "text-gray-400"
                            }`}
                          >
                            {message.sent_at
                              ? new Date(message.sent_at).toLocaleString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                  month: "short",
                                  day: "numeric",
                                })
                              : "Just now"}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center">No messages yet.</p>
                  )}
                </div>

                {/* Message Input */}
                <div className="p-4 bg-white border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <textarea
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 resize-none rounded-lg border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="1"
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <button
                      onClick={handleSendMessage}
                      className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <BiSend size={20} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">Select a chat to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default PrivateMessages;
