import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const NodeLesson3 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/NodeLesson4');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Node.js Lesson 3: Modules</h1>

      <div className="lesson-content">
        <p>
          Modules let you split your code into separate files and import/export them.
        </p>
        <pre>
{`// math.js
exports.add = (a, b) => a + b;

// app.js
const math = require('./math');
console.log(math.add(5,3)); // 8`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create a module that exports a function.
2. Import it and use it.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create a module that exports a function. 2. Import it and use it."
        LessonId="node-lesson-3"
        language="js"
        initialCode={`// Write your code here
`}
        expectedOutput={`8`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/NodeLesson4" onClick={() => goToNextLesson()} className="next-lesson">
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default NodeLesson3;
