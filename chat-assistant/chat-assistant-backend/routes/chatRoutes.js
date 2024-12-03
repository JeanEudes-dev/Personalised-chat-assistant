const express = require("express");
const router = express.Router();
const { getChats, createChat, addMessage } = require("../controllers/chatController");

// Define routes
router.get("/", getChats); // Get chat history
router.post("/", createChat); // Create a new chat
router.post("/:id/messages", addMessage); // Add a message to a chat
const { getAIResponse } = require("../controllers/aiController");
router.post("/ai", getAIResponse); // Route for AI response

module.exports = router;
