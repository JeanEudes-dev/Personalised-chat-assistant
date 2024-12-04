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
      max_new_tokens: 200, // Limit response length
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

    // Extract the generated text
    const generatedText = response.data[0]?.generated_text || "";

    // Split into lines and find the first section before "User:" or "AI:"
    const lines = generatedText.split("\n");
    const result = [];

    for (const line of lines) {
      if (line.trim().startsWith("User:") || line.trim().startsWith("AI:")) {
        break; // Stop collecting when reaching "User:" or "AI:"
      }
      result.push(line.trim());
    }

    // Join the collected lines as the final response
    const firstParagraph = result.join(" ").trim();

    res.json({
      sender: "bot",
      text: firstParagraph || "I'm sorry, I couldn't process that.",
    });
  } catch (error) {
    console.error("Error fetching AI response:", error.message);
    res.status(500).json({ error: "Failed to fetch AI response" });
  }
};
