const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'AIzaSyCXbrkjMCZY5t_ldD31YsmEPi6x2ZQQihI' });

const fileGen = async (query) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Generate file structure for this query: ${query} \n response should be in json format.\n Here is response format but dont create javascript based like node js react or next etc.. follow basic html css and js:\n 
        {
  "project-name": "your-project-name",
  "project-description": "your project description",
  "structure": {
    "src": {
      "components": {
        "Button.js": {},
        "Card.js": {},
        "NavBar.js": {},
        "Footer.js": {}
      },
      "pages": {
        "Home.js": {},
        "About.js": {},
        "Contact.js": {}
      },
      "utils": {
        "helpers.js": {},
        "api.js": {}
      },
      "styles": {
        "main.css": {},
        "variables.css": {}
      }
    },
    "public": {
      "index.html": {},
      "favicon.ico": {}
    },
    "package.json": {},
    "README.md": {}
  }
} `,
    });
    console.log(response.text);
    return response.text;
}



module.exports = fileGen;


