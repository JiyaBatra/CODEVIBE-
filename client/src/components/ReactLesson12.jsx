import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const ReactLesson12 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/ReactLesson13');

  return (
    <div className="lesson">
      <h1 className="lesson-title">React Lesson 12: Forms & Controlled Components</h1>

      <div className="lesson-content">
        <p>
          Controlled components have their value controlled by React state.
        </p>
        <p>Example:</p>
        <pre>
{`function MyForm() {
  const [name, setName] = useState('');
  return (
    <input value={name} onChange={(e) => setName(e.target.value)} />
  );
}`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create input field controlled by state 'name'.
2. Display value as user types.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create input field controlled by state 'name'. 2. Display value as user types."
        LessonId="react-lesson-12"
        language="js"
        initialCode={`function MyForm() {
  const [name, setName] = useState('');
  return (
    <input value={name} onChange={(e) => setName(e.target.value)} />
  );
}`}
        expectedOutput={`input`}
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
    onClick={() => navigate('/ReactLesson11')}
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
    onClick={() => navigate('/ReactLesson13')}
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

export default ReactLesson12;
