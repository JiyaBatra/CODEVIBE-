const fs = require('fs');
const path = require('path');
const dir = 'C:\\Users\\H S SAMIRA\\CODEVIBE-\\client\\src\\components';
const files = fs.readdirSync(dir).filter(f => f.includes('Lesson') && f.endsWith('.jsx'));

files.forEach(f => {
  const c = fs.readFileSync(path.join(dir, f), 'utf-8');
  const idx = c.indexOf('expectedOutput={(output)');
  if (idx === -1) return;
  const snippet = c.substring(idx, idx + 200).replace(/\r\n/g, '\n').replace(/\n/g, ' | ');
  console.log(`${f}: ${snippet}`);
});
