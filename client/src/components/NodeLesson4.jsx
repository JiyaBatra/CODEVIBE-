import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const NodeLesson4 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/NodeLesson5');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Node.js Lesson 4: HTTP Module</h1>

      <div className="lesson-content">
        <p>
          Node.js HTTP module lets you create servers to handle requests and responses.
        </p>
        <pre>
{`const http = require('http');
http.createServer((req,res) => {
  res.write("Hello Server");
  res.end();
}).listen(3000);`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create a server that prints "Hello Server".
2. Listen on port 3000.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create a server that prints 'Hello Server'. 2. Listen on port 3000."
        LessonId="node-lesson-4"
        language="js"
        initialCode={`// Write your code here
`}
        expectedOutput={`Hello Server`}
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
    onClick={() => navigate('/NodeLesson3')}
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
    onClick={() => navigate('/NodeLesson5')}
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

export default NodeLesson4;
