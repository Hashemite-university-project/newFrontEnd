import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { io } from 'socket.io-client';
import Cookies from "js-cookie";
import axios from 'axios';

function LiveChat({ isOpen, onClose, groupId, userID }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [project, setProject] = useState('');
    const [student, setStudent] = useState({});

      const getTokenFromCookies = () => {
        return Cookies.get("access_token") || "";
      };
      const token = getTokenFromCookies();
      const fetchProjects = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/project/projectDetails/${groupId}`,{withCredentials: true});
          setProject(response.data.projectDetails); 
        } catch (error) {
          console.error('Error fetching projects:', error);
        }}

        const fetchStudent = async () => {
            try {
              const response = await axios.get(`http://localhost:8000/user/info`,{withCredentials: true});
              setStudent(response.data); 
            } catch (error) {
              console.error('Error fetching projects:', error);
            }}

    useEffect(() => {
        if (isOpen) {
            console.log(userID);
            const newSocket = io('ws://localhost:8000', {
                extraHeaders: { token: token }, 
            });
            setSocket(newSocket);
            newSocket.emit('fetchGroupMessages', { group_id: groupId });
            newSocket.on('groupMessageHistory', (messageHistory) => {
                console.log(messageHistory);
                setMessages(messageHistory); 
            });
            newSocket.on('receiveGroupMessage', (message) => {
                console.log(message);
                setMessages((prevMessages) => [...prevMessages, message]); 
            });
            fetchProjects();
            fetchStudent();
            return () => {
                newSocket.disconnect();
            };
            
        }
    }, [isOpen, groupId, token, userID]);

    const handleSendMessage = () => {
        if (newMessage.trim() && socket) {
            const messageData = {
                group_id: groupId,
                name: student.user_name,
                message: newMessage,
                time: new Date().toLocaleTimeString(),
                token: token, 
            };
            socket.emit('sendGroupMessage', messageData); 
            setMessages((prevMessages) => [...prevMessages, messageData]);
            setNewMessage('');
        }
    };

    return (
        <Transition show={isOpen}>
            <div className="fixed inset-0 z-50 flex justify-end">
                {/* Overlay */}
                <Transition.Child
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-50"
                    leave="transition-opacity duration-300"
                    leaveFrom="opacity-50"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
                </Transition.Child>
                {/* Chat Panel */}
                <Transition.Child
                    enter="transition-transform duration-300"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition-transform duration-300"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                >
                    <div className="relative w-full max-w-md bg-zinc-800 text-white flex flex-col">
                        {/* Chat Header */}
                        <div className="flex items-center px-4 py-3 border-b border-zinc-700">
                            <img src={project.project_img} alt="avatar" className="w-12 h-12 mr-3 rounded-2xl" />
                            <div className="flex-1">
                                <h6 className="font-medium">{project.project_name}</h6>
                                <p className="text-sm text-gray-400">Available</p>
                            </div>
                            <button onClick={onClose} className="text-gray-400 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        {/* Chat Messages */}
                        <div className="flex-1 p-4 overflow-y-auto">
                            {messages.map((msg, index) => (
                                <div key={index} className={`mb-4 ${msg.sender_id === userID ? 'text-right' : 'text-left'}`}>
                                    <h5 className="text-sm font-semibold">{msg.sender.user_name}</h5>
                                    <p className="text-gray-300">{msg.message}</p>
                                    <span className="text-xs text-gray-500">
                                        {new Date(msg.createdAt).toLocaleString(undefined, {
                                            dateStyle: 'medium',
                                            timeStyle: 'short',
                                        })}
                                    </span>
                                </div>
                            ))}
                        </div>
                        {/* Message Input */}
                        <div className="flex items-center px-4 py-3 border-t border-zinc-700">
                            <input
                                type="text"
                                className="flex-1 p-2 bg-zinc-700 text-white placeholder-gray-400 focus:outline-none"
                                placeholder="Type your message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <button
                                className="ml-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
                                onClick={handleSendMessage}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </Transition.Child>
            </div>
        </Transition>
    );
}

export default LiveChat;
