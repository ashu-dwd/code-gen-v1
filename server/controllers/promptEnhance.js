const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'AIzaSyCXbrkjMCZY5t_ldD31YsmEPi6x2ZQQihI' });

const promptGen = async (query) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Enhance this user prompt and add more details to make it more specific and clear. The goal is to improve the prompt for better understanding and execution. Here is the user prompt: ${query}. You should only return the enhanced prompt without any additional text or explanation. The enhanced prompt should be clear, concise, and focused on the main objective. Avoid unnecessary jargon or complex language. Just provide the improved version of the original prompt.`,
    });
    console.log(response.text);
    return response.text;
}



module.exports = promptGen;


