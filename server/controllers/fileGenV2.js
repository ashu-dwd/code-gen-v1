const fs = require('fs');
const path = require('path');

// Generate a folder name using the project name and current timestamp
const createFolderName = (projectInfo) => {
    const time = new Date().toISOString().replace(/[:.]/g, '-');
    return `${projectInfo["project-name"]}-${time}`;
};

// Make a directory if it doesn't exist
const makeDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Created folder: ${dir}`);
    }
};

// Make an empty file
const makeFile = (file) => {
    fs.writeFileSync(file, '', 'utf8');
    console.log(`Created file: ${file}`);
};

// Loop through the structure and create folders/files accordingly
const buildStructure = (items, basePath) => {
    for (const name in items) {
        const fullPath = path.join(basePath, name);

        if (Object.keys(items[name]).length === 0) {
            // Empty object = file
            makeFile(fullPath);
        } else {
            // Otherwise it's a folder
            makeDir(fullPath);
            buildStructure(items[name], fullPath);
        }
    }
};

// Main function to start building the project structure
const generateProjectStructure = (projectData) => {
    const folderName = createFolderName(projectData);
    const fullPath = path.join(__dirname, 'dumped_data', folderName);

    console.log(`Creating project: ${projectData["project-name"]}`);
    console.log(`Description: ${projectData["project-description"]}`);

    makeDir(fullPath); // Create base folder inside "dumped"
    buildStructure(projectData.structure, fullPath); // Build inner structure

    console.log(`Project successfully created in: ${fullPath}`);
    return fullPath;
};

// Export the function
module.exports = generateProjectStructure;
