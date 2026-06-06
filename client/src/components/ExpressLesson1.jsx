import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const ExpressLesson1 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/ExpressLesson2');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Express Lesson 1: Introduction</h1>

      <div className="lesson-content">
        <p>
          Express.js is a Node.js framework for building web applications and APIs.
          It simplifies routing, middleware handling, and server setup.
        </p>
        <p>Example:</p>
        <pre>
{`const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('Hello Express!');
});
app.listen(3000, () => console.log('Server running on port 3000'));`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create an Express server.
2. Respond with 'Hello Express!' on root route.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create an Express server. 2. Respond with 'Hello Express!' on root route."
        LessonId="express-lesson-1"
        language="js"
        initialCode={`const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.listen(3000, () => console.log('Server running on port 3000'));`}
        expectedOutput={`Hello Express!`}
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
    onClick={() => navigate('/ExpressLesson1')}
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
    onClick={() => navigate('/ExpressLesson2')}
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

export default ExpressLesson1;
