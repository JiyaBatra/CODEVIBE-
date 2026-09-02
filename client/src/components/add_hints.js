const fs = require('fs');
const path = require('path');

const dirPath = "C:\\Users\\H S SAMIRA\\CODEVIBE-\\client\\src\\components";
const files = fs.readdirSync(dirPath).filter(file => file.includes('Lesson') || file.includes('lesson'));

files.forEach(file => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) return;
    
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Skip if hint already present
    if (content.includes('hint=')) return;
    
    let hintText = "💡 Review the lesson instructions carefully. Make sure your output matches exactly.";
    
    // Try to extract instructions
    const instMatch = content.match(/<pre[^>]*instructions[^>]*>([\s\S]*?)<\/pre>/i);
    if (instMatch) {
        let inst = instMatch[1].replace(/[`{}]/g, '').replace(/Task:/i, '').trim();
        let lines = inst.split('\n').map(l => l.trim()).filter(l => l && !l.toLowerCase().includes('output:'));
        if (lines.length > 0) {
            let extracted = lines.slice(0, 2).join(' ').trim();
            if (extracted) {
                hintText = "💡 Hint: " + extracted.replace(/"/g, "'").replace(/\n/g, ' ');
            }
        }
    }
    
    if (hintText.length > 120) hintText = hintText.substring(0, 117) + "...";
    hintText = hintText.replace(/\r?\n|\r/g, " ");
    
    if (content.includes('<Compiler')) {
        let newContent = content.replace(/<Compiler/, `<Compiler\n        hint="${hintText}"`);
        fs.writeFileSync(filePath, newContent, 'utf-8');
        console.log("Updated " + file + " with hint");
    }
});
