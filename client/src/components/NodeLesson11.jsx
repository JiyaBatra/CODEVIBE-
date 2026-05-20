import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const NodeLesson11 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/NodeLesson12');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Node.js Lesson 11: MongoDB Connection</h1>

      <div className="lesson-content">
        <p>
          Using Mongoose, you can connect Node.js to MongoDB and perform database operations.
        </p>
        <pre>
{`const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb')
  .then(() => console.log('Connected'))
  .catch(err => console.log(err));`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Connect to MongoDB using mongoose.
2. Log 'Connected' if successful.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Connect to MongoDB using mongoose. 2. Log 'Connected' if successful."
        LessonId="node-lesson-11"
        language="js"
        initialCode={`// Write your code here
`}
        expectedOutput={`Connected`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/NodeLesson12" onClick={goToNextLesson} className="next-lesson">
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default NodeLesson11;
