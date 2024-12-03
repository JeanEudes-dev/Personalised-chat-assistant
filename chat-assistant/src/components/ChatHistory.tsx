import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ChatHistory = ({
    isVisible,
    onToggle,
    chatHistory,
    onSelectChat,
}: {
    isVisible: boolean;
    onToggle: () => void;
    chatHistory: { id: number; name: string; messages: { sender: string; text: string }[] }[];
    onSelectChat: (chatId: number) => void;
}) => {
    return (
        <div
            className={`absolute top-0 left-0 h-full bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 shadow-lg transition-transform ${isVisible ? "translate-x-0" : "-translate-x-full"
                }`}
            style={{ width: "300px", zIndex: 20 }}
        >
            <button
                onClick={onToggle}
                className="absolute top-6 -right-10 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600"
                aria-label={isVisible ? "Close History" : "Open History"}
            >
                {isVisible ? <FaChevronLeft size={16} /> : <FaChevronRight size={16} />}
            </button>

            <div className="p-4 border-b border-gray-300 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Chat History</h2>
            </div>

            <ul className="p-4 space-y-3 overflow-y-auto h-[calc(100%-60px)]">
                {chatHistory.map((chat) => (
                    <li
                        key={chat.id}
                        onClick={() => onSelectChat(chat.id)}
                        className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:bg-blue-100 dark:hover:bg-blue-600 cursor-pointer transition-all"
                    >
                        {chat.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatHistory;

