const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../client/src/components');

const files = fs.readdirSync(componentsDir).filter(f => f.includes('Lesson') && f.endsWith('.jsx') && f !== 'LessonLayout.jsx');

let replaced = 0;

for (const file of files) {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  let modified = false;

  // Replace import axios
  if (content.includes("import axios from 'axios';") || content.includes('import axios from "axios";')) {
    content = content.replace(/import axios from ['"]axios['"];?\n?/, "import { useProgress } from '../hooks/useProgress';\n");
    modified = true;
  }

  // Insert hook call at the top of the component
  const componentMatch = content.match(/const\s+([A-Za-z0-9_]+)\s*=\s*\([^)]*\)\s*=>\s*{/);
  if (componentMatch && modified && !content.includes("useProgress()")) {
    const compName = componentMatch[1];
    content = content.replace(componentMatch[0], componentMatch[0] + "\n  const { progress, completeLesson } = useProgress();");
  }

  // Replace axios.get for progress inside useEffect
  // Usually looks like: axios.get(`${API_BASE_URL}/api/progress/${email}`).then(res => { const completedFromBackend = res.data?.completedLessons || [];
  const getRegex = /axios\.get\(`\$\{API_BASE_URL\}\/api\/progress\/\$\{email\}`\)\s*\.then\(\s*res\s*=>\s*{([\s\S]*?)const\s+completedFromBackend\s*=\s*res\.data\?\.completedLessons\s*\|\|\s*\[\];/;
  if (getRegex.test(content)) {
    content = content.replace(getRegex, "if (progress) {\n          const completedFromBackend = progress.completedLessons || [];");
    // Also remove the .catch
    content = content.replace(/\.catch\(err\s*=>\s*console\.error\(['"]Error syncing practice progress from backend:['"],\s*err\)\);/, "}");
  }

  const getRegex2 = /axios\.get\(`\$\{API_BASE_URL\}\/api\/progress\/\$\{email\}`\)\s*\.then\(\(res\)\s*=>\s*{([\s\S]*?)const\s+completedFromBackend\s*=\s*res\.data\?\.completedLessons\s*\|\|\s*\[\];/;
  if (getRegex2.test(content)) {
    content = content.replace(getRegex2, "if (progress) {\n          const completedFromBackend = progress.completedLessons || [];");
    content = content.replace(/\.catch\(\(err\)\s*=>\s*console\.error\(['"]Error syncing practice progress from backend:['"],\s*err\)\);/, "}");
  }
  
  // Replace axios.post for completing lesson
  const postRegex = /axios\.post\(`\$\{API_BASE_URL\}\/api\/lesson\/\$\{([^}]+)\}\/complete`,\s*{\s*email(?:,\s*score:\s*(\d+))?\s*}\)/g;
  content = content.replace(postRegex, (match, p1, p2) => {
    return `completeLesson({ lessonId: ${p1}, score: ${p2 || 100} })`;
  });

  const postRegex2 = /axios\.post\(`\$\{API_BASE_URL\}\/api\/lesson\/\$\{([^}]+)\}\/complete`,\s*{\s*email,\s*score:\s*(\d+),\s*coins:\s*(\d+)\s*}\)/g;
  content = content.replace(postRegex2, (match, p1, p2, p3) => {
    return `completeLesson({ lessonId: ${p1}, score: ${p2 || 100}, coins: ${p3 || 0} })`;
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    replaced++;
  }
}

console.log(`Refactored ${replaced} files.`);
