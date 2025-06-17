
const dotenv = require('dotenv'); // Import dotenv
const { GoogleGenerativeAI } = require('@google/generative-ai');
dotenv.config();
const apiKey = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const getChatbotResponse = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log("Received Prompt:", prompt);

    const result = await model.generateContent(prompt);
    console.log("AI Response:", result.response);

    const aiText =
      typeof result.response.text === 'function'
        ? await result.response.text()
        : result.response.text;
    console.log("Generated Text:", aiText);
    res.status(200).json({ response: aiText });
  } catch (error) {
    console.error("Error generating content:", error.message);
    res.status(500).json({ error: error.message });
  }
};
module.exports = { getChatbotResponse };