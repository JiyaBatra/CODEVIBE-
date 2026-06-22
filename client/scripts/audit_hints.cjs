const fs = require('fs');
const path = require('path');
const dir = 'C:\\Users\\H S SAMIRA\\CODEVIBE-\\client\\src\\components';
const files = fs.readdirSync(dir).filter(f => f.includes('Lesson') && f.endsWith('.jsx'));
let errors = [];
files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf-8');
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    if (line.includes('hint=')) {
      // Check for unescaped backslash followed by a character that's invalid in JSX attr
      if (line.includes('\\\\') || line.includes('\\"') || line.includes('\\%')) {
        errors.push(f + ':' + (i+1) + ' => ' + line.trim().substring(0, 100));
      }
    }
  });
});
if (errors.length) {
  console.log('PROBLEMS FOUND:');
  errors.forEach(e => console.log(e));
} else {
  console.log('All hint lines look clean!');
}
