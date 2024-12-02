import React from "react";

const ChatHistory = ({
    history,
    onSelect,
    onToggle,
    isVisible,
}: {
    history: { id: string; name: string }[];
    onSelect: (id: string) => void;
    onToggle: () => void;
    isVisible: boolean;
}) => {
    return (
        <div
            className={`absolute left-0 top-0 h-full bg-gray-200 shadow-lg transform ${
                isVisible ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out`}
            style={{ width: "300px" }}
        >
            <button
                onClick={onToggle}
                className="absolute top-2 right-[-40px] bg-blue-500 text-white px-2 py-1 rounded-r-lg"
            >
                {isVisible ? "Hide" : "Show"}
            </button>
            <div className="p-4">
                <h2 className="text-lg font-bold mb-4">Chat History</h2>
                <ul className="space-y-2">
                    {history.map((chat) => (
                        <li
                            key={chat.id}
                            onClick={() => onSelect(chat.id)}
                            className="p-2 bg-white rounded-lg shadow hover:bg-blue-100 cursor-pointer"
                        >
                            {chat.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ChatHistory;
