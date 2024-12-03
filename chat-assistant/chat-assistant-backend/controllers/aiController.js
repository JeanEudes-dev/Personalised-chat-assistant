const axios = require("axios");

exports.getAIResponse = async (req, res) => {
  const { text } = req.body;
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/google/flan-t5-large",
      { inputs: text },
      {
        headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` },
      }
    );

    const botReply =
      response.data[0]?.generated_text || "I'm sorry, I couldn't process that.";
    res.json({ sender: "bot", text: botReply });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch AI response" });
  }
};
