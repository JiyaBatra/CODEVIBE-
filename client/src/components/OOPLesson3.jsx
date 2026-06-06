import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const OOPLesson3 = () => {
  const [ok, setOk] = useState(false);
  const nav = useNavigate();

  return (
    <div className="lesson">
      <h1>OOP Lesson 3 (JavaScript): Modules</h1>

      <div className="lesson-content">
        <p>
          Modules let you split your code into separate files. 
          Use <code>export</code> to share and <code>import</code> to use.
        </p>
        <pre>{`// math.js
export function add(a, b) {
  return a + b;
}

// main.js
import { add } from './math.js';
console.log(add(5, 3)); // 8`}</pre>
      </div>

      <pre className="instructions">{`Task:
1) Create math.js that exports add(a,b)
2) Import it in main.js
3) Print: 8`}</pre>

      <Compiler
        hint="💡 Hint: 1) Create math.js that exports add(a,b) 2) Import it in main.js"
        LessonId="oop-lesson-3"
        language="js"
        initialCode={`// --- math.js ---
export function add(a, b) {
  // your code here
}

// --- main.js ---
import { add } from './math.js';
console.log(add(5, 3));`}
        expectedOutput={(o)=>o.trim() === "8"}
        onSuccess={() => setOk(true)}
        multiFile={true} // ✅ tell Compiler it's multi-file
      />

        {/* Lesson Footer Navigation */}
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #333"
  }}
>
  <button
    onClick={() => nav('/OOPLesson2')}
    style={{
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer"
    }}
  >
    ← Previous Lesson
  </button>

  <button
    onClick={() => nav('/OOPLesson4')}
    style={{
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer"
    }}
  >
    Next Lesson →
  </button>
</div>
    </div>
  );
};

export default OOPLesson3;
