import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const NodeLesson8 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/NodeLesson9');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Node.js Lesson 8: Express Routing</h1>

      <div className="lesson-content">
        <p>
          Routes define how an application responds to client requests.
        </p>
        <pre>
{`const express = require('express');
const app = express();

app.get('/', (req,res) => res.send('Home'));
app.get('/about', (req,res) => res.send('About'));
app.listen(3000);`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create '/' route returning "Home".
2. Create '/about' route returning "About".`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create '/' route returning 'Home'. 2. Create '/about' route returning 'About'."
        LessonId="node-lesson-8"
        language="js"
        initialCode={`// Write your code here
`}
        expectedOutput={`Home\nAbout`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/NodeLesson9" onClick={goToNextLesson} className="next-lesson">
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default NodeLesson8;
