const fs = require('fs');
const path = require('path');
const dir = 'C:\\Users\\H S SAMIRA\\CODEVIBE-\\client\\src\\components';

// Check which CLesson files are missing initialCode or expectedOutput
const files = fs.readdirSync(dir).filter(f => (f.startsWith('CLesson') || f.startsWith('Clesson')) && f.endsWith('.jsx'));

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf-8');
  const hasInitialCode = content.includes('initialCode');
  const hasExpectedOutput = content.includes('expectedOutput');
  if (!hasInitialCode || !hasExpectedOutput) {
    console.log(`BROKEN: ${f} — initialCode:${hasInitialCode} expectedOutput:${hasExpectedOutput}`);
  } else {
    console.log(`OK: ${f}`);
  }
});
