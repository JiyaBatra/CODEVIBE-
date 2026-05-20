import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const ExpressLesson4 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/ExpressLesson5');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Express Lesson 4: Handling POST Requests</h1>

      <div className="lesson-content">
        <p>
          POST requests are used to send data to the server. Use <b>express.json()</b> to parse JSON.
        </p>
        <p>Example:</p>
        <pre>
{`app.use(express.json());
app.post('/login', (req, res) => {
  const { username } = req.body;
  res.send('Welcome ' + username);
});`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create a /login POST route.
2. Read 'username' from JSON body and respond with 'Welcome {username}'.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create a /login POST route. 2. Read 'username' from JSON body and respond with 'Welcome username'."
        LessonId="express-lesson-4"
        language="javascript"
        initialCode={`const express = require('express');
const app = express();

app.use(express.json());

app.post('/login', (req, res) => {
  const { username } = req.body;
  res.send('Welcome ' + username);
});

app.listen(3000, () => console.log('Server running on port 3000'));`}
        expectedOutput={`Welcome`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/ExpressLesson5" onClick={goToNextLesson} className="next-lesson">
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default ExpressLesson4;
