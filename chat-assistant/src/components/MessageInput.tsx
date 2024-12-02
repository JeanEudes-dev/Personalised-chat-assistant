import React, { useState } from "react";

const MessageInput = ({ onSend }: { onSend: (message: string) => void }) => {
    const [input, setInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() === "") return;
        onSend(input);
        setInput("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-4 bg-white shadow-md flex items-center"
        >
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
            />
            <button
                type="submit"
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
                Send
            </button>
        </form>
    );
};

export default MessageInput;
