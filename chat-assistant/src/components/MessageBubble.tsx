import React from "react";
import { FaUserCircle, FaRobot } from "react-icons/fa";

const MessageBubble = ({
    sender,
    text,
    isTyping = false,
}: {
    sender: string;
    text: string;
    isTyping?: boolean;
}) => {
    const isUser = sender === "user";

    return (
        <div className={`flex items-center ${isUser ? "justify-end" : "justify-start"} my-4`}>
            {/* Avatar */}
            {!isUser && (
                <FaRobot className="text-secondary w-10 h-10 mr-3 shadow-md" />
            )}

            {/* Message Bubble or Typing Indicator */}
            <div
                className={`relative max-w-xs md:max-w-md lg:max-w-lg p-4 rounded-lg shadow-lg ${isUser
                    ? "bg-gradient-to-r from-primary to-blue-400 text-white"
                    : "bg-gradient-to-r from-gray-100 to-gray-300 text-gray-900"
                    }`}
            >
                {isTyping ? (
                    <div className="flex space-x-2">
                        <span className="dot bg-gray-500 animate-pulse"></span>
                        <span className="dot bg-gray-500 animate-pulse"></span>
                        <span className="dot bg-gray-500 animate-pulse"></span>
                    </div>
                ) : (
                    <p className="leading-relaxed">{text}</p>
                )}
            </div>

            {/* User Avatar */}
            {isUser && (
                <FaUserCircle className="text-primary w-10 h-10 ml-3 shadow-md" />
            )}
        </div>
    );
};

export default MessageBubble;
