const fs = require('fs');
const path = require('path');

const dirPath = "C:\\Users\\H S SAMIRA\\CODEVIBE-\\client\\src\\components";
const files = fs.readdirSync(dirPath).filter(file => file.startsWith('CLesson') || file.startsWith('Clesson'));

files.forEach(file => {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Find hint="..."
    const hintRegex = /hint="([^"]+)"/g;
    let newContent = content.replace(hintRegex, (match, hintText) => {
        // Remove backslashes, change \" to ', remove \n and \%
        let cleanText = hintText
            .replace(/\\"/g, "'")
            .replace(/\\%/g, "%")
            .replace(/\\n/g, "")
            .replace(/`/g, "'")
            .replace(/\\/g, ""); // remove any other rogue backslashes
            
        return `hint="${cleanText}"`;
    });
    
    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf-8');
        console.log(`Fixed ${file}`);
    }
});
