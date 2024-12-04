import React, { useState, useEffect } from "react";
import ChatBox from "./components/ChatBox";
import MessageInput from "./components/MessageInput";
import ChatHistory from "./components/ChatHistory";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";

const App = () => {
    const [isHistoryVisible, setHistoryVisible] = useState(false);
    const [theme, setTheme] = useState("dark");
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [chatHistory, setChatHistory] = useState<
        { id: number; name: string; messages: { sender: string; text: string }[] }[]
    >([]);
    const [isBotThinking, setIsBotThinking] = useState(false);

    useEffect(() => {
        document.documentElement.className = theme;
        document.body.style.backgroundColor = theme === "light" ? "#ffffff" : "#181818";
    }, [theme]);

    useEffect(() => {
        const storedHistory = localStorage.getItem("chatHistory");
        if (storedHistory) {
            setChatHistory(JSON.parse(storedHistory));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    }, [chatHistory]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    const handleSendMessage = async (text: string) => {
        if (text.trim() === "") return;

        const userMessage = { sender: "user", text };
        setMessages((prevMessages) => {
            // Handle new chat creation
            if (prevMessages.length === 0) {
                const chatName = text.split(" ").slice(0, 2).join(" ");
                const newChat = { id: Date.now(), name: chatName, messages: [userMessage] };
                setChatHistory((prevHistory) => [...prevHistory, newChat]);
            } else {
                // Update messages in the current chat
                setChatHistory((prevHistory) =>
                    prevHistory.map((chat) =>
                        chat.id === prevHistory[prevHistory.length - 1].id
                            ? { ...chat, messages: [...chat.messages, userMessage] }
                            : chat
                    )
                );
            }
            return [...prevMessages, userMessage];
        });

        setIsBotThinking(true);

        try {
            const response = await fetch("http://localhost:5000/api/chats/ai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text,
                    history: messages, // Send the full chat history
                }),
            });
            const data = await response.json();
            console.log(data)
            const botResponse = { sender: "bot", text: data.text || "Sorry, I couldn't get a response from the AI." };

            setMessages((prevMessages) => {
                setChatHistory((prevHistory) =>
                    prevHistory.map((chat) =>
                        chat.id === prevHistory[prevHistory.length - 1].id
                            ? { ...chat, messages: [...chat.messages, botResponse] }
                            : chat
                    )
                );
                return [...prevMessages, botResponse];
            });
        } catch (error) {
            console.error("Error fetching AI response:", error);
            const botResponse = { sender: "bot", text: "Sorry, there was an error connecting to the AI." };
            setMessages((prevMessages) => {
                setChatHistory((prevHistory) =>
                    prevHistory.map((chat) =>
                        chat.id === prevHistory[prevHistory.length - 1].id
                            ? { ...chat, messages: [...chat.messages, botResponse] }
                            : chat
                    )
                );
                return [...prevMessages, botResponse];
            });
        }

        setIsBotThinking(false);
    };


    const handleNewChat = () => {
        setMessages([]);
    };

    const handleSelectChat = (chatId: number) => {
        const selectedChat = chatHistory.find((chat) => chat.id === chatId);
        if (selectedChat) {
            setMessages(selectedChat.messages);
        }
    };

    return (
        <div className="min-h-screen flex bg-bg-main text-text-main transition-colors duration-300">
            {/* Chat History */}
            <ChatHistory
                isVisible={isHistoryVisible}
                onToggle={() => setHistoryVisible(!isHistoryVisible)}
                chatHistory={chatHistory}
                onSelectChat={handleSelectChat}
            />

            {/* Main Chat Area */}
            <div className="flex-grow flex flex-col px-8 md:px-16 lg:px-80 py-6 space-y-6">
                <header className="p-4 flex justify-between items-center bg-bg-secondary shadow-lg rounded-lg transition-colors duration-300">
                    <h1 className="text-xl font-bold text-primary">Chat Assistant</h1>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handleNewChat}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all duration-200"
                        >
                            New Chat
                        </button>
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

                <MessageInput onSend={handleSendMessage} />
            </div>
        </div>
    );
};

export default App;
