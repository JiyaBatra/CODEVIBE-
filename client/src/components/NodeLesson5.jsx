import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const NodeLesson5 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/NodeLesson6');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Node.js Lesson 5: File System (fs)</h1>

      <div className="lesson-content">
        <p>
          Node.js fs module allows reading/writing files.
        </p>
        <pre>
{`const fs = require('fs');
fs.writeFileSync('demo.txt','Hello FS');
console.log(fs.readFileSync('demo.txt','utf8')); // Hello FS`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create a file "demo.txt" with content "Hello FS".
2. Read and print it.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create a file 'demo.txt' with content 'Hello FS'. 2. Read and print it."
        LessonId="node-lesson-5"
        language="js"
        initialCode={`// Write your code here
`}
        expectedOutput={`Hello FS`}
        onSuccess={handleSuccess}
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
    onClick={() => navigate('/NodeLesson4')}
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
    onClick={() => navigate('/NodeLesson6')}
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

export default NodeLesson5;
