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
    onClick={() => navigate('/NodeLesson2')}
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
    onClick={() => navigate('/NodeLesson4')}
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

export default NodeLesson3;
