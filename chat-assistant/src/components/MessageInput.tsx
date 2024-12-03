import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";

const MessageInput = ({ onSend }: { onSend: (text: string) => void }) => {
    const [input, setInput] = useState("");

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() === "") return;
        console.log("Sending message:", input); // Placeholder for send action
        onSend(input); // Call the onSend prop function to handle the sending action
        setInput(""); // Clear input field after sending the message
    };

    return (
        <form
            onSubmit={handleSend}
            className="fixed bottom-0 left-1/4 w-1/2 flex items-center bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-3 shadow-md"
        >
            {/* Input Field */}
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-800"
                placeholder="Type a message..."
            />
            {/* Send Button */}
            <button
                type="submit"
                className={`ml-3 p-3 bg-blue-800 text-white rounded-full shadow-md hover:bg-blue-400 transition-all ${input.trim() === "" ? "opacity-50 cursor-not-allowed" : ""}`}
                aria-label="Send Message"
                disabled={input.trim() === ""}
            >
                <IoIosSend size={20} />
            </button>
        </form>
    );
};

export default MessageInput;
