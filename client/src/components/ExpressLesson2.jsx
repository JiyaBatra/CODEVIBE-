import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const ExpressLesson2 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/ExpressLesson3');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Express Lesson 2: Routing Basics</h1>

      <div className="lesson-content">
        <p>
          Routing allows you to define responses for different URLs (paths).
        </p>
        <p>Example:</p>
        <pre>
{`app.get('/about', (req, res) => {
  res.send('About Page');
});
app.get('/contact', (req, res) => {
  res.send('Contact Page');
});`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Add /about route that responds 'About Page'.
2. Add /contact route that responds 'Contact Page'.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Add /about route that responds 'About Page'. 2. Add /contact route that responds 'Contact Page'."
        LessonId="express-lesson-2"
        language="js"
        initialCode={`const express = require('express');
const app = express();

app.get('/about', (req, res) => {
  res.send('About Page');
});

app.get('/contact', (req, res) => {
  res.send('Contact Page');
});

app.listen(3000, () => console.log('Server running on port 3000'));`}
        expectedOutput={`About Page`}
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
    onClick={() => navigate('/ExpressLesson3')}
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

export default ExpressLesson2;
