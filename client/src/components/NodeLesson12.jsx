import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const NodeLesson12 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/Certificate');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Node.js Lesson 12: Mini Project - REST API</h1>

      <div className="lesson-content">
        <p>
          Build a simple REST API using Express.js that handles GET requests and returns JSON data.
        </p>
        <pre>
{`const express = require('express');
const app = express();

app.get('/users', (req,res) => {
  res.json([{name:"Jiya", age:18}]);
});

app.listen(3000);`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create a GET /users route.
2. Return JSON array [{name:"Jiya", age:18}].`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create a GET /users route. 2. Return JSON array [name:'Jiya', age:18]."
        LessonId="node-lesson-12"
        language="js"
        initialCode={`// Write your code here
`}
        expectedOutput={`Jiya`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/Certificate" onClick={goToNextLesson} className="next-lesson">
          🏆 VIEW CERTIFICATE
        </Link>
      )}
    </div>
  );
};

export default NodeLesson12;
