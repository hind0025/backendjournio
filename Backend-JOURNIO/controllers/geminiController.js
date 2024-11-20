// const axios = require('axios');

// // Load environment variables
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// const GEMINI_API_URL = process.env.GEMINI_API_URL;

// // Function to call Gemini API
// const getChatbotResponse = async (req, res) => {
//   console.log(GEMINI_API_KEY , GEMINI_API_URL);
//   try {
//     const { prompt } = req.body; // Get user input from the request

//     // Send request to Gemini AI
//     const response = await axios.post(
//       ${GEMINI_API_URL}?key=${GEMINI_API_KEY},
//       {
//         prompt: {
//           text: prompt
//         }
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       }
//     );

//     // Send back the response to the client
//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error('Error communicating with Gemini AI:', error.message);
//     res.status(500).json({ error: 'Internal server error', details: error.message });
//   }
// };

// module.exports = {
//   getChatbotResponse
// };
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// Replace "YOUR_API_KEY" with your actual Gemini API key

// Specify the Gemini model you want to use


// In geminiController.js
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const genAI = new GoogleGenerativeAI("AIzaSyC6k9aDhDJLK5SXfM5-ncWdMTula1oPfDE");
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const getChatbotResponse = async (req, res) => {
//   const prompt = "Explain how AI works";  // Define the prompt you want to send

//   try {
//     // Await the response from the model generation
//     const result = await model.generateContent(prompt);
    
//     // Debugging: Log the entire response to see its structure
//     console.log("AI Response:", result.response);
    
//     // Check if result.response.text is a function, and invoke it
//     const aiText = typeof result.response.text === 'function' ? await result.response.text() : result.response.text;
    
//     // Debugging: Log the generated text to verify it
//     console.log("Generated Text:", aiText);
    
//     // Send the result back to the client
//     res.status(200).json({ response: aiText });
//   } catch (error) {
//     console.error("Error generating content:", error.message);
//     // Return an error response if something goes wrong
//     res.status(500).json({ error: error.message });
//   }
// };

// // Export the function
// module.exports = { getChatbotResponse };

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