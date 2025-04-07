const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'AIzaSyCXbrkjMCZY5t_ldD31YsmEPi6x2ZQQihI' });

const CodeGen = async (query, fileName, filePath, projectStructure) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `You are a smart code generation AI.

A user has asked: "${query}"

Your task is to generate clean, production-ready code for the following file:
- 📄 File Name: ${fileName}
- 📁 File Path: ${filePath}

Here is the complete project structure for context:
${JSON.stringify(projectStructure, null, 2)}

⚙️ Guidelines:
- Generate only the code that belongs in **${fileName}**, based on its role in the project.
- Ensure the code is syntactically correct and logically fits within the project structure.
- Avoid adding unnecessary comments or explanations. Only return the final code.
- Use best practices for formatting, naming conventions, and imports.
- If the file is a config, setup, component, or route file, provide boilerplate or meaningful structure as needed.

Return the code content **only**, without any markdown formatting (no triple backticks).
`,
    });
    console.log(response.text);
    return response.text;
}



module.exports = CodeGen;


