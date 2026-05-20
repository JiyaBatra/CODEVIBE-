import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const ExpressLesson6 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/ExpressLesson7');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Express Lesson 6: Route Parameters</h1>

      <div className="lesson-content">
        <p>
          Route parameters allow dynamic URLs. Example: <code>/user/:id</code>.
        </p>
        <p>Example:</p>
        <pre>
{`app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.send('User ID: ' + userId);
});`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create GET route '/user/:id'.
2. Respond with 'User ID: {id}' where id is from URL.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create GET route '/user/:id'. 2. Respond with 'User ID: id' where id is from URL."
        LessonId="express-lesson-6"
        language="javascript"
        initialCode={`const express = require('express');
const app = express();

app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.send('User ID: ' + userId);
});

app.listen(3000, () => console.log('Server running on port 3000'));`}
        expectedOutput={`User ID`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/ExpressLesson7" onClick={goToNextLesson} className="next-lesson">
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default ExpressLesson6;
