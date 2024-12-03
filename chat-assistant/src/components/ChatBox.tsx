import React from "react";
import MessageBubble from "./MessageBubble";

const ChatBox = ({
    messages,
    isBotThinking,
}: {
    messages: { sender: string; text: string }[];
    isBotThinking: boolean;
}) => {
    return (
        <div className="flex-grow bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg mt-4 p-6 overflow-y-auto space-y-4 relative">
            {messages.length > 0 ? (
                messages.map((msg, idx) => (
                    <MessageBubble key={idx} sender={msg.sender} text={msg.text} />
                ))
            ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
                    <p>No messages yet. Start the conversation!</p>
                </div>
            )}
            {isBotThinking && (
                <div className="flex items-center justify-start space-x-3">
                    <div className="w-8 h-8 border-4 border-dotted border-blue-500 rounded-full animate-spin"></div>
                    <div className="text-gray-500 dark:text-gray-400">Bot is thinking...</div>
                </div>
            )}
        </div>
    );
};

export default ChatBox;
