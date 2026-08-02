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
  .catch(err => console.error(err))