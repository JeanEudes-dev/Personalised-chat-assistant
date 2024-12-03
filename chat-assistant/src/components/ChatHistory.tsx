import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ChatHistory = ({
    isVisible,
    onToggle,
}: {
    isVisible: boolean;
    onToggle: () => void;
}) => {
    // Load chat history from localStorage or set it as an empty array
    const loadChatHistory = () => {
        const history = localStorage.getItem("chatHistory");
        return history ? JSON.parse(history) : [];
    };

    const [chatHistory, setChatHistory] = useState(loadChatHistory());

    // Save the chat history to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    }, [chatHistory]);

    // Function to create a new chat and add it to the history
    const createNewChat = (chatName: string) => {
        const newChat = { id: Date.now(), name: chatName };
        setChatHistory((prevHistory: any) => [...prevHistory, newChat]);
    };

    return (
        <div
            className={`absolute top-0 left-0 h-full bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 shadow-lg transition-transform ${isVisible ? "translate-x-0" : "-translate-x-full"
                }`}
            style={{ width: "300px", zIndex: 20 }}
        >
            {/* Toggle Button */}
            <button
                onClick={onToggle}
                className="absolute top-6 -right-10 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600"
                aria-label={isVisible ? "Close History" : "Open History"}
            >
                {isVisible ? <FaChevronLeft size={16} /> : <FaChevronRight size={16} />}
            </button>

            {/* Header */}
            <div className="p-4 border-b border-gray-300 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Chat History</h2>
            </div>

            {/* Chat List */}
            <ul className="p-4 space-y-3 overflow-y-auto h-[calc(100%-60px)]">
                {chatHistory.map((chat: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                    <li
                        key={chat.id}
                        className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:bg-blue-100 dark:hover:bg-blue-600 cursor-pointer transition-all"
                    >
                        {chat.name}
                    </li>
                ))}
            </ul>

            {/* Add New Chat Button */}
            <div className="p-4">
                <button
                    onClick={() => createNewChat("New Chat")}
                    className="w-full p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200"
                >
                    Create New Chat
                </button>
            </div>
        </div>
    );
};

export default ChatHistory;
