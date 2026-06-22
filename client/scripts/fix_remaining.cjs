const fs = require('fs');
const path = require('path');
const dir = 'C:\\Users\\H S SAMIRA\\CODEVIBE-\\client\\src\\components';

// Manual specific fixes for the remaining 18 files
const manualFixes = {
  // DSA lessons with regex/numeric checks
  'DsaLesson4.jsx':  '1',     // sorting length output — just a number
  'DsaLesson5.jsx':  '1',
  'DsaLesson6.jsx':  '1',
  'DsaLesson7.jsx':  '1',
  'DsaLesson8.jsx':  '1',
  'DsaLesson9.jsx':  '1',
  'DsaLesson10.jsx': '10 15', // after dequeue: remaining 10 and 15
  'DsaLesson11.jsx': '1',

  // HTML lessons using norm() function  — look up expectedNormalized below
  'HtmlLesson1.jsx': null, // will extract from file
  'HtmlLesson2.jsx': null,
  'HtmlLesson3.jsx': null,

  // Node lessons with === comparison (single quotes, multiline)
  'NodeLesson2.jsx': 'Hello from Node.js!',
  'NodeLesson3.jsx': '8',
  'NodeLesson4.jsx': 'Hello Server',
  'NodeLesson5.jsx': 'Hello FS',
  'NodeLesson6.jsx': 'Hello Event!',
  'NodeLesson7.jsx': 'Hello Express',
  'NodeLesson9.jsx': 'Hello Middleware',
};

let fixed = 0;

Object.entries(manualFixes).forEach(([file, val]) => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;

  if (val === null) {
    // Extract expectedNormalized from the file
    const match = content.match(/const\s+expectedNormalized\s*=\s*`([\s\S]*?)`/);
    if (match) {
      val = match[1];
    } else {
      // try double-quote version
      const match2 = content.match(/const\s+expectedNormalized\s*=\s*"([^"]+)"/);
      if (match2) val = match2[1];
    }
  }

  if (!val) {
    console.log(`⚠️  Could not determine expected value for ${file}`);
    return;
  }

  // Replace entire expectedOutput={...} block (handles multi-line functions)
  content = content.replace(
    /expectedOutput=\{[\s\S]*?\}\}/,
    `expectedOutput={\`${val}\`}`
  );

  // If that was too greedy, try without double-closing braces
  if (content === original) {
    content = content.replace(
      /expectedOutput=\{\(output\)[\s\S]*?\}/,
      `expectedOutput={\`${val}\`}`
    );
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Fixed: ${file} → "${val}"`);
    fixed++;
  } else {
    console.log(`⚠️  No change in ${file}`);
  }
});

// Final check
console.log(`\nTotal fixed: ${fixed}`);
const remaining = fs.readdirSync(dir)
  .filter(f => f.includes('Lesson') && f.endsWith('.jsx'))
  .filter(f => fs.readFileSync(path.join(dir, f), 'utf-8').includes('expectedOutput={(output)'));
console.log(`Still function-based: ${remaining.length}`);
remaining.forEach(f => console.log(' -', f));
