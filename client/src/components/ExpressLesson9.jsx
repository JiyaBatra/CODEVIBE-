import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const ExpressLesson9 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/ExpressLesson10');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Express Lesson 9: Error Handling</h1>

      <div className="lesson-content">
        <p>
          Middleware can catch errors using 4 parameters: (err, req, res, next)
        </p>
        <pre>
{`app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Add error-handling middleware.
2. Respond with status 500 and message 'Something broke!'`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Add error-handling middleware. 2. Respond with status 500 and message 'Something broke!'"
        LessonId="express-lesson-9"
        language="javascript"
        initialCode={`const express = require('express');
const app = express();

app.get('/', (req, res) => {
  throw new Error('Test Error');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => console.log('Server running on port 3000'));`}
        expectedOutput={`Something broke`}
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
    onClick={() => navigate('/ExpressLesson8')}
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
    onClick={() => navigate('/ExpressLesson10')}
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

export default ExpressLesson9;
