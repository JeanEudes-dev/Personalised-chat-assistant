import React, { useState, useEffect } from "react";
import ChatBox from "./components/ChatBox";
import MessageInput from "./components/MessageInput";
import ChatHistory from "./components/ChatHistory";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";

const App = () => {
    const [isHistoryVisible, setHistoryVisible] = useState(false);
    const [theme, setTheme] = useState("dark");
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [isBotThinking, setIsBotThinking] = useState(false);
    const [chatHistory, setChatHistory] = useState<{ id: number; name: string }[]>([]);
    const [currentChatName, setCurrentChatName] = useState<string>("");

    // Load chat history from localStorage
    useEffect(() => {
        const storedHistory = localStorage.getItem("chatHistory");
        if (storedHistory) {
            setChatHistory(JSON.parse(storedHistory));
        }
    }, []);

    // Save chat history to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    }, [chatHistory]);

    useEffect(() => {
        // Apply theme class to the root element
        document.documentElement.className = theme;

        // Optional: change background color dynamically based on theme
        document.body.style.backgroundColor = theme === "light" ? "#ffffff" : "#181818";
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    const handleSendMessage = (text: string) => {
        if (text.trim() === "") return;

        // Add user message to the chat
        const userMessage = { sender: "user", text };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        // Bot thinking state
        setIsBotThinking(true);

        // Simulate bot thinking for 1 second
        setTimeout(() => {
            const botResponse = { sender: "bot", text: "I'm thinking... Here's your answer!" };
            setMessages((prevMessages) => [...prevMessages, botResponse]);
            setIsBotThinking(false); // Bot stops thinking after response
        }, 1000);
    };

    const handleCreateNewChat = () => {
        setMessages([]); // Clear the current chat
        setCurrentChatName(""); // Reset the current chat name

        // Set the new chat name based on the first two words of the first message
        const newChatName = messages.length > 0 ? getChatName(messages[0].text) : "New Chat";
        setCurrentChatName(newChatName);

        // Add the new chat to chat history
        const newChat = { id: Date.now(), name: newChatName };
        setChatHistory((prevHistory) => [...prevHistory, newChat]);
    };

    const getChatName = (message: string) => {
        const words = message.split(" ");
        return words.length > 1 ? `${words[0]} ${words[1]}` : words[0];
    };

    return (
        <div className="min-h-screen flex bg-bg-main text-text-main transition-colors duration-300">
            {/* Chat History */}
            <ChatHistory
                isVisible={isHistoryVisible}
                onToggle={() => setHistoryVisible(!isHistoryVisible)}
            />

            {/* Main Chat Area */}
            <div className="flex-grow flex flex-col px-8 md:px-16 lg:px-80 py-6 space-y-6">
                {/* Header */}
                <header className="p-4 flex justify-between items-center bg-bg-secondary shadow-lg rounded-lg transition-colors duration-300">
                    <h1 className="text-xl font-bold text-primary">Chat Assistant</h1>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="flex items-center p-2 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-100 transition-all duration-200"
                            aria-label="Toggle Theme"
                        >
                            {theme === "light" ? (
                                <BsMoonStarsFill className="mr-2" />
                            ) : (
                                <BsSunFill className="mr-2" />
                            )}
                        </button>
                    </div>
                </header>

                <div className="relative">
                    <ChatBox messages={messages} isBotThinking={isBotThinking} />
                </div>

                {/* Message Input */}
                <MessageInput onSend={handleSendMessage} />

                {/* Create New Chat Button */}
                <button
                    onClick={handleCreateNewChat}
                    className="mt-4 p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200"
                >
                    Create New Chat
                </button>
            </div>
        </div>
    );
};

export default App;
