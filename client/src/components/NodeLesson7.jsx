import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const NodeLesson7 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/NodeLesson8');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Node.js Lesson 7: Express.js</h1>

      <div className="lesson-content">
        <p>
          Express.js is a framework that simplifies building web servers in Node.js.
        </p>
        <pre>
{`const express = require('express');
const app = express();
app.get('/', (req,res) => res.send('Hello Express'));
app.listen(3000);`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create an Express server.
2. Respond with "Hello Express" at root route.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create an Express server. 2. Respond with 'Hello Express' at root route."
        LessonId="node-lesson-7"
        language="js"
        initialCode={`// Write your code here
`}
        expectedOutput={`Hello Express`}
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
    onClick={() => navigate('/NodeLesson6')}
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
    onClick={() => navigate('/NodeLesson8')}
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

export default NodeLesson7;
