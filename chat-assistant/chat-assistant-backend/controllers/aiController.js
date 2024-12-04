const axios = require("axios");

const BOT_CONTEXT =
  "You are Qwen, created by Alibaba Cloud. You are a helpful assistant. Respond concisely and helpfully.";

exports.getAIResponse = async (req, res) => {
  const { text } = req.body;

  // Build the input for a conversational flow
  const prompt = `${BOT_CONTEXT}\nUser: ${text}\nAI:`;

  const payload = {
    inputs: prompt,
    parameters: {
      max_new_tokens: 150, // Limit response length
      return_full_text: false, // Avoid echoing the prompt
    },
  };

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
      }
    );

    // Extract the first paragraph
    const generatedText = response.data[0]?.generated_text || "";
    const firstParagraph =
      generatedText
        .split("\n") // Split by line breaks
        .filter((line) => line.trim()) // Remove empty lines
        .shift() || "I'm sorry, I couldn't process that."; // Get the first non-empty line

    res.json({ sender: "bot", text: firstParagraph });
  } catch (error) {
    console.error("Error fetching AI response:", error.message);
    res.status(500).json({ error: "Failed to fetch AI response" });
  }
};
