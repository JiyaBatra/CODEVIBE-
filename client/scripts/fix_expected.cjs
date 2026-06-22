const fs = require('fs');
const path = require('path');
const dir = 'C:\\Users\\H S SAMIRA\\CODEVIBE-\\client\\src\\components';
const files = fs.readdirSync(dir).filter(f => f.includes('Lesson') && f.endsWith('.jsx'));

let fixed = 0;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;

  // ── 1. Multiline normalize function with template literal expected value
  // expectedOutput={(output) => { const normalize = ... const expected = `VALUE`; return ... }}
  content = content.replace(
    /expectedOutput=\{[\s\S]*?const\s+expected\s*=\s*`([\s\S]*?)`;\s*[\s\S]*?return\s+normalize[\s\S]*?\}\}/g,
    (_, val) => `expectedOutput={\`${val}\`}`
  );

  // ── 2. output.trim() === 'VALUE' (single quotes, single line or multiline)
  content = content.replace(
    /expectedOutput=\{\(output\)\s*=>\s*[\s\S]*?output\.trim\(\)\s*===\s*'([^']+)'\s*\}\}/g,
    (_, val) => `expectedOutput={\`${val}\`}`
  );

  // ── 3. output.trim() === "VALUE" (double quotes, single line or multiline)
  content = content.replace(
    /expectedOutput=\{\(output\)\s*=>\s*[\s\S]*?output\.trim\(\)\s*===\s*"([^"]+)"\s*\}\}/g,
    (_, val) => `expectedOutput={\`${val}\`}`
  );

  // ── 4. output.includes('VALUE') — single string
  content = content.replace(
    /expectedOutput=\{\(output\)\s*=>\s*output\.includes\('([^']+)'\)\}/g,
    (_, val) => `expectedOutput={\`${val}\`}`
  );
  content = content.replace(
    /expectedOutput=\{\(output\)\s*=>\s*output\.includes\("([^"]+)"\)\}/g,
    (_, val) => `expectedOutput={\`${val}\`}`
  );

  // ── 5. output.includes('A') && output.includes('B') → use first value
  content = content.replace(
    /expectedOutput=\{\(output\)\s*=>\s*output\.includes\('([^']+)'\)\s*&&\s*output\.includes\([^)]+\)\}/g,
    (_, val) => `expectedOutput={\`${val}\`}`
  );
  content = content.replace(
    /expectedOutput=\{\(output\)\s*=>\s*output\.includes\("([^"]+)"\)\s*&&\s*output\.includes\([^)]+\)\}/g,
    (_, val) => `expectedOutput={\`${val}\`}`
  );

  // ── 6. output.includes('A') || output.includes('B') → use first value
  content = content.replace(
    /expectedOutput=\{\(output\)\s*=>\s*output\.includes\('([^']+)'\)\s*\|\|\s*output\.includes\([^)]+\)\}/g,
    (_, val) => `expectedOutput={\`${val}\`}`
  );
  content = content.replace(
    /expectedOutput=\{\(output\)\s*=>\s*output\.includes\("([^"]+)"\)\s*\|\|\s*output\.includes\([^)]+\)\}/g,
    (_, val) => `expectedOutput={\`${val}\`}`
  );

  // ── 7. output.trim() === 'A' || output.trim() === 'B' → use first value
  content = content.replace(
    /expectedOutput=\{\(output\)\s*=>\s*output\.trim\(\)\s*===\s*'([^']+)'\s*\|\|\s*output\.trim[^}]+\}/g,
    (_, val) => `expectedOutput={\`${val}\`}`
  );
  content = content.replace(
    /expectedOutput=\{\(output\)\s*=>\s*output\.trim\(\)\s*===\s*"([^"]+)"\s*\|\|\s*output\.trim[^}]+\}/g,
    (_, val) => `expectedOutput={\`${val}\`}`
  );

  // ── 8. output.trim().toLowerCase().includes('VALUE')
  content = content.replace(
    /expectedOutput=\{\(output\)\s*=>\s*[\r\n\s]*output\.trim\(\)\.toLowerCase\(\)\.includes\('([^']+)'\)[\r\n\s]*\}/g,
    (_, val) => `expectedOutput={\`${val}\`}`
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Fixed: ${file}`);
    fixed++;
  }
});

console.log(`\nTotal fixed: ${fixed}`);

// Final check
const remaining = files.filter(f => {
  const c = fs.readFileSync(path.join(dir, f), 'utf-8');
  return c.includes('expectedOutput={(output)');
});
console.log(`Still function-based: ${remaining.length}`);
if (remaining.length) remaining.forEach(f => console.log(' -', f));
