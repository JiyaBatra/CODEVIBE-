import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const ReactLesson4 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/ReactLesson5');

  return (
    <div className="lesson">
      <h1 className="lesson-title">React Lesson 4: State in React</h1>

      <div className="lesson-content">
        <p>
          State allows components to hold and manage data that changes over time.
        </p>
        <p>Example:</p>
        <pre>
{`function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create a functional component 'Counter'.
2. Use useState to manage a count.
3. Render the count and a button to increment it.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create a functional component 'Counter'. 2. Use useState to manage a count."
        LessonId="react-lesson-4"
        language="js"
        initialCode={`function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`}
        expectedOutput={`Count`}
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
    onClick={() => navigate('/ReactLesson3')}
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
    onClick={() => navigate('/ReactLesson5')}
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

export default ReactLesson4;
