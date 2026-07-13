const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // 1. Remove const token = localStorage.getItem('authToken');
      content = content.replace(/const token = localStorage\.getItem\(['"]authToken['"]\);\s*/g, '');
      content = content.replace(/let token = localStorage\.getItem\(['"]authToken['"]\);\s*/g, '');

      // 2. Remove headers: { Authorization: `Bearer ${token}` }
      // This regex tries to match headers object if it only contains Authorization
      content = content.replace(/headers:\s*{\s*Authorization:\s*`Bearer \$\{token\}`\s*}\s*,?/g, '');
      
      // 3. Remove Authorization: `Bearer ${token}` if it's inside a larger headers object
      content = content.replace(/Authorization:\s*`Bearer \$\{token\}`\s*,?/g, '');
      
      // 4. Sometimes it's headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
      content = content.replace(/headers:\s*{\s*Authorization:\s*`Bearer \$\{localStorage\.getItem\(['"]authToken['"]\)\}`\s*}\s*,?/g, '');
      content = content.replace(/Authorization:\s*`Bearer \$\{localStorage\.getItem\(['"]authToken['"]\)\}`\s*,?/g, '');

      fs.writeFileSync(fullPath, content, 'utf8');
    }
  });
}

processDir(path.join(__dirname, '../client/src'));
console.log("Cleanup done.");
