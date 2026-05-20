import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const ExpressLesson3 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/ExpressLesson4');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Express Lesson 3: Middleware Basics</h1>

      <div className="lesson-content">
        <p>
          Middleware are functions that run before your route handlers.
          They can modify requests, responses, or handle authentication.
        </p>
        <p>Example:</p>
        <pre>
{`app.use((req, res, next) => {
  console.log('Request URL:', req.url);
  next();
});`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Add a middleware that logs the requested URL.
2. Ensure it runs before route handlers.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Add a middleware that logs the requested URL. 2. Ensure it runs before route handlers."
        LessonId="express-lesson-3"
        language="javascript"
        initialCode={`const express = require('express');
const app = express();

// Middleware to log URL
app.use((req, res, next) => {
  console.log('Request URL:', req.url);
  next();
});

// Route
app.get('/', (req, res) => res.send('Home Page'));

app.listen(3000, () => console.log('Server running on port 3000'));`}
        expectedOutput={`Request URL: /`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/ExpressLesson4" onClick={goToNextLesson} className="next-lesson">
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default ExpressLesson3;
