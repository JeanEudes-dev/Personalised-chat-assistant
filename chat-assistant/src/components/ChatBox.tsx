import React from "react";
import MessageBubble from "./MessageBubble";

const ChatBox = ({
    messages,
    isTyping,
}: {
    messages: { sender: string; text: string }[];
    isTyping: boolean;
}) => {
    return (
        <div className="flex flex-col h-full p-4 bg-gray-100 shadow-lg rounded-lg overflow-y-auto">

            {messages.map((msg, index) => (
                <MessageBubble key={index} sender={msg.sender} text={msg.text} />
            ))}
            {isTyping && (
                <div className="flex justify-start my-2">
                    <div className="p-3 bg-gray-500 text-white rounded-lg">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBox;
