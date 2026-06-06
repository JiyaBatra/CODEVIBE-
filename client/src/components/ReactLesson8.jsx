import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const ReactLesson8 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/ReactLesson9');

  return (
    <div className="lesson">
      <h1 className="lesson-title">React Lesson 8: useEffect Hook</h1>

      <div className="lesson-content">
        <p>
          <code>useEffect</code> runs side-effects in React like fetching data or updating DOM.
        </p>
        <p>Example:</p>
        <pre>
{`function Timer() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setCount(c => c + 1), 1000);
    return () => clearInterval(interval);
  }, []);
  return <p>Count: {count}</p>;
}`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create a component 'Timer'.
2. Use useEffect to increment count every second.
3. Display count.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create a component 'Timer'. 2. Use useEffect to increment count every second."
        LessonId="react-lesson-8"
        language="js"
        initialCode={`function Timer() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setCount(c => c + 1), 1000);
    return () => clearInterval(interval);
  }, []);
  return <p>Count: {count}</p>;
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
    onClick={() => navigate('/ReactLesson7')}
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
    onClick={() => navigate('/ReactLesson9')}
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

export default ReactLesson8;
