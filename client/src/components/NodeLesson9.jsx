import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const NodeLesson9 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/NodeLesson10');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Node.js Lesson 9: Middleware</h1>

      <div className="lesson-content">
        <p>
          Middleware functions in Express are functions that have access to request, response, and next.
        </p>
        <pre>
{`const express = require('express');
const app = express();

const logger = (req,res,next) => {
  console.log('Request received');
  next();
}

app.use(logger);
app.get('/', (req,res) => res.send('Hello Middleware'));
app.listen(3000);`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create a middleware that logs 'Request received'.
2. Create '/' route returning 'Hello Middleware'.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create a middleware that logs 'Request received'. 2. Create '/' route returning 'Hello Middleware'."
        LessonId="node-lesson-9"
        language="js"
        initialCode={`// Write your code here
`}
        expectedOutput={`Hello Middleware`}
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
    onClick={() => navigate('/NodeLesson8')}
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
    onClick={() => navigate('/NodeLesson10')}
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

export default NodeLesson9;
