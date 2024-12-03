import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

const ChatBox = ({
    messages,
    isBotThinking,
}: {
    messages: { sender: string; text: string }[];
    isBotThinking: boolean;
}) => {
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Scroll to the latest message whenever messages update
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isBotThinking]);

    return (
        <div
            className="flex-grow bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg p-6 overflow-y-auto space-y-4"
            style={{ paddingBottom: "80px" }} // Account for MessageInput height
        >
            {messages.length > 0 ? (
                messages.map((msg, idx) => (
                    <MessageBubble key={idx} sender={msg.sender} text={msg.text} />
                ))
            ) : (
                <div className="text-center text-white dark:text-gray-400 mt-10">
                    <h2>How can i assist you today!</h2>
                </div>
            )}
            {isBotThinking && (
                <div className="flex items-center justify-start space-x-3">
                    <div className="w-8 h-8 border-4 border-dotted border-blue-500 rounded-full animate-spin"></div>
                    <div className="text-gray-500 dark:text-gray-400">Bot is thinking...</div>
                </div>
            )}
            {/* Reference to scroll into view */}
            <div ref={chatEndRef}></div>
        </div>
    );
};

export default ChatBox;
