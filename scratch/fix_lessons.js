const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../client/src/components');

const files = fs.readdirSync(componentsDir).filter(f => f.includes('Lesson') && f.endsWith('.jsx') && f !== 'LessonLayout.jsx');

let fixed = 0;

for (const file of files) {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;

  // Fix 1: The refactor left a stray `})` after the if (progress) { ... } block
  // Pattern:
  //   if (progress) {
  //     const completedFromBackend = ...
  //     ...
  //   })       <-- stray paren
  //   }        <-- extra brace from old .catch replacement
  // Replace the double-closing with a single }
  content = content.replace(/(\s*)}\)\s*\n(\s*)}/g, (match, ws1, ws2) => {
    return `${ws1}}`;
  });

  // Fix 2: Remove orphaned .catch blocks from completeLesson calls
  // completeLesson() returns a Promise from useMutation.mutateAsync but
  // the old .catch chain was also kept in place. We should wrap in try/catch or just remove.
  content = content.replace(
    /completeLesson\(\{([^}]+)\}\)\s*\n\s*\.catch\(err\s*=>\s*console\.error\(["']Save practice progress error:["'],\s*err\)\);/g,
    (match, inner) => {
      return `completeLesson({ ${inner} }).catch(err => console.error("Save practice progress error:", err));`;
    }
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    fixed++;
    console.log(`Fixed: ${file}`);
  }
}

console.log(`\nFixed ${fixed} files.`);
