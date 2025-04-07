const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const fileGenController = require('./controllers/fileGen');
const generateProjectStructure = require('./controllers/fileGenV2');
const CodeGen = require('./controllers/code-gen');
const promptGen = require('./controllers/promptEnhance');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Delay utility (ms milliseconds)
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Clean up markdown-style code blocks
const cleanJsonQuery = (text) =>
    text.replace(/```(json|javascript|html)?\n?|\n?```/g, '').trim();

// Recursively create files from structure with delay before CodeGen
const writeCodeRecursively = async (structure, currentPath, query, jsonStructure) => {
    for (const name in structure) {
        const newPath = path.join(currentPath, name);
        const isFile = Object.keys(structure[name]).length === 0;

        if (isFile) {
            await sleep(2000); // 2-second delay before generating each file
            const code = await CodeGen(query, newPath, name, jsonStructure);
            const dir = path.dirname(newPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(newPath, cleanJsonQuery(code), 'utf-8');
            console.log(`File written: ${newPath}`);
        } else {
            await writeCodeRecursively(structure[name], newPath, query, jsonStructure);
        }
    }
};

// API endpoint
app.post('/api/v1/generate', async (req, res) => {
    try {
        const { query } = req.body;
        if (!query) {
            return res.status(400).json({ error: 'Query is required' });
        }

        const rawResponse = await fileGenController(query);
        const cleanedJson = cleanJsonQuery(rawResponse);

        let jsonStructure;
        try {
            jsonStructure = JSON.parse(cleanedJson);
        } catch (err) {
            return res.status(400).json({ error: 'Invalid JSON structure', raw: cleanedJson });
        }

        const folderName = generateProjectStructure(jsonStructure);
        console.log('Project folder created:', folderName);

        const enhancedQuery = await promptGen(query);
        console.log('Enhanced query ready');

        await writeCodeRecursively(jsonStructure.structure, folderName, enhancedQuery, jsonStructure);

        res.json({ message: 'Files generated successfully', folder: folderName });
    } catch (error) {
        console.error('Error generating files:', error);
        res.status(500).json({ error: 'Failed to generate files', details: error.message });
    }
});

// Health check
app.get('/', (req, res) => {
    res.send('Server is running');
});

const server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

server.setTimeout(0);
