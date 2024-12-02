import React, { useState, useEffect } from "react";
import ChatBox from "./components/ChatBox";
import MessageInput from "./components/MessageInput";
import ChatHistory from "./components/ChatHistory";

const LOCAL_STORAGE_KEY = "chatSessions";

const loadSessions = () => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

const saveSessions = (sessions: { id: string; name: string; messages: any[] }[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sessions));
};

const App = () => {
    const [sessions, setSessions] = useState<
        { id: string; name: string; messages: { sender: string; text: string }[] }[]
    >([]);
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
    const [isHistoryVisible, setHistoryVisible] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    // Load sessions on mount
    useEffect(() => {
        const loadedSessions = loadSessions();
        setSessions(loadedSessions);
        if (loadedSessions.length > 0) setCurrentSessionId(loadedSessions[0].id);
    }, []);

    // Save sessions whenever they change
    useEffect(() => {
        saveSessions(sessions);
    }, [sessions]);

    // Get current session messages
    const currentSession = sessions.find((s) => s.id === currentSessionId);

    // Create a new session
    const createNewSession = () => {
        const newSession = {
            id: Date.now().toString(),
            name: `Chat ${sessions.length + 1}`,
            messages: [],
        };
        setSessions([newSession, ...sessions]);
        setCurrentSessionId(newSession.id);
    };

    // Handle message send
    const handleSend = (message: string) => {
        if (!currentSessionId) return;

        const updatedSessions = sessions.map((s) =>
            s.id === currentSessionId
                ? {
                      ...s,
                      messages: [...s.messages, { sender: "user", text: message }],
                  }
                : s
        );

        setSessions(updatedSessions);
        setIsTyping(true);

        setTimeout(() => {
            const botMessage = { sender: "bot", text: "Processing your message..." };
            setSessions((prevSessions) =>
                prevSessions.map((s) =>
                    s.id === currentSessionId
                        ? { ...s, messages: [...s.messages, botMessage] }
                        : s
                )
            );
            setIsTyping(false);
        }, 1000);
    };

    return (
        <div className="h-screen flex relative">
            {/* Chat History */}
            <ChatHistory
                history={sessions.map((s) => ({ id: s.id, name: s.name }))}
                onSelect={(id) => setCurrentSessionId(id)}
                onToggle={() => setHistoryVisible(!isHistoryVisible)}
                isVisible={isHistoryVisible}
            />

            {/* Main Chat Area */}
            <div className="flex-grow flex flex-col">
                {/* Header */}
                <div className="p-4 flex justify-between items-center bg-white shadow-md">
                    <h1 className="text-xl font-bold">
                        {currentSession?.name || "No Chat Selected"}
                    </h1>
                    <button
                        onClick={createNewSession}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg"
                    >
                        New Chat
                    </button>
                </div>

                {/* Chat Box */}
                <ChatBox messages={currentSession?.messages || []} isTyping={isTyping} />

                {/* Message Input */}
                <MessageInput onSend={handleSend} />
            </div>
        </div>
    );
};

export default App;
