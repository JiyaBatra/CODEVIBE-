import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const ExpressLesson7 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/ExpressLesson8');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Express Lesson 7: Query Parameters</h1>

      <div className="lesson-content">
        <p>
          Query parameters are in URL after <code>?</code>. Example: <code>/search?name=John</code>
        </p>
        <p>Example:</p>
        <pre>
{`app.get('/search', (req, res) => {
  const name = req.query.name;
  res.send('Hello ' + name);
});`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create GET route '/search'.
2. Read 'name' from query and respond with 'Hello {name}'.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create GET route '/search'. 2. Read 'name' from query and respond with 'Hello name'."
        LessonId="express-lesson-7"
        language="javascript"
        initialCode={`const express = require('express');
const app = express();

app.get('/search', (req, res) => {
  const name = req.query.name;
  res.send('Hello ' + name);
});

app.listen(3000, () => console.log('Server running on port 3000'));`}
        expectedOutput={`Hello`}
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
    onClick={() => navigate('/ExpressLesson6')}
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
    onClick={() => navigate('/ExpressLesson8')}
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

export default ExpressLesson7;
