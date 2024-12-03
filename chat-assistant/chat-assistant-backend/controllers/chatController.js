// Mock database
let chatHistory = [];

// Get all chats
exports.getChats = (req, res) => {
    res.json(chatHistory);
};

// Create a new chat
exports.createChat = (req, res) => {
    const { title } = req.body;
    const newChat = {
        id: chatHistory.length + 1,
        title: title || `Chat ${chatHistory.length + 1}`,
        messages: [],
    };
    chatHistory.push(newChat);
    res.status(201).json(newChat);
};

// Add a message to an existing chat
exports.addMessage = (req, res) => {
    const { id } = req.params;
    const { sender, text } = req.body;

    const chat = chatHistory.find((chat) => chat.id == id);
    if (!chat) return res.status(404).json({ error: "Chat not found" });

    const newMessage = { sender, text };
    chat.messages.push(newMessage);
    res.status(201).json(newMessage);
};
