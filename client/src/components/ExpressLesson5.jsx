import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const ExpressLesson5 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/ExpressLesson6');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Express Lesson 5: CRUD Basics</h1>

      <div className="lesson-content">
        <p>
          CRUD = Create, Read, Update, Delete. Express + in-memory array can simulate CRUD.
        </p>
        <p>Example:</p>
        <pre>
{`let users = [];
app.post('/user', (req, res) => users.push(req.body));
app.get('/user', (req, res) => res.json(users));`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create an array 'users'.
2. POST /user adds to array.
3. GET /user returns the array.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create an array 'users'. 2. POST /user adds to array."
        LessonId="express-lesson-5"
        language="javascript"
        initialCode={`const express = require('express');
const app = express();

app.use(express.json());
let users = [];

app.post('/user', (req, res) => {
  users.push(req.body);
  res.send('User added');
});

app.get('/user', (req, res) => {
  res.json(users);
});

app.listen(3000, () => console.log('Server running on port 3000'));`}
        expectedOutput={`User added`}
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
    onClick={() => navigate('/ExpressLesson4')}
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
    onClick={() => navigate('/ExpressLesson6')}
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

export default ExpressLesson5;
