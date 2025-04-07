const fs = require('fs');
const path = require('path');

// Create a unique folder name with timestamp
const generateFolderName = (projectStructure) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    return `${projectStructure["project-name"]}-${timestamp}`;
};

// Create directory if it doesn't exist
const createDirectory = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Created directory: ${dirPath}`);
    }
};

// Create empty file
const createFile = (filePath) => {
    fs.writeFileSync(filePath, '', 'utf8');
    console.log(`Created file: ${filePath}`);
};

// Recursively process the structure and create files and directories
const processStructure = (structure, currentPath) => {
    for (const key in structure) {
        const itemPath = path.join(currentPath, key);

        // If value is an empty object, it's a file
        if (Object.keys(structure[key]).length === 0) {
            createFile(itemPath);
        } else {
            // Otherwise, it's a directory
            createDirectory(itemPath);
            processStructure(structure[key], itemPath);
        }
    }
};

// Main function to generate project structure
const generateProjectStructure = (jsonStructure) => {
    // Generate base folder name
    const baseFolder = generateFolderName(jsonStructure);

    console.log(`Generating project structure for: ${jsonStructure["project-name"]}`);
    console.log(`Description: ${jsonStructure["project-description"]}`);

    // Create base directory
    createDirectory(baseFolder);

    // Process structure starting from base folder
    processStructure(jsonStructure.structure, baseFolder);
    console.log(`Project structure generated successfully in folder: ${baseFolder}`);
    return baseFolder;
};

// Execute the generator
module.exports = generateProjectStructure;