import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const NodeLesson2 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/NodeLesson3');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Node.js Lesson 2: Hello World</h1>

      <div className="lesson-content">
        <p>
          Create a file <code>app.js</code> and run it with <code>node app.js</code>.
        </p>
        <pre>
{`console.log("Hello from Node.js!");`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Print "Hello from Node.js!" to the console.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Print 'Hello from Node.js!' to the console."
        LessonId="node-lesson-2"
        language="js"
        initialCode={`// Write your code here
`}
        expectedOutput={`Hello from Node.js!`}
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
    onClick={() => navigate('/NodeLesson1')}
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
    onClick={() => navigate('/NodeLesson3')}
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

export default NodeLesson2;
