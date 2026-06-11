import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const ReactLesson10 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/ReactLesson11');

  return (
    <div className="lesson">
      <h1 className="lesson-title">React Lesson 10: Lifting State Up</h1>

      <div className="lesson-content">
        <p>
          When two components need the same state, lift it up to their common parent.
        </p>
        <p>Example:</p>
        <pre>
{`function Parent() {
  const [value, setValue] = useState('');
  return (
    <div>
      <Child1 value={value} onChange={setValue} />
      <Child2 value={value} />
    </div>
  );
}`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create a parent component holding state 'value'.
2. Pass it to two child components, one to modify and one to display.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create a parent component holding state 'value'. 2. Pass it to two child components, one to modify and on..."
        LessonId="react-lesson-10"
        language="js"
        initialCode={`function Parent() {
  const [value, setValue] = useState('');
  return (
    <div>
      <Child1 value={value} onChange={setValue} />
      <Child2 value={value} />
    </div>
  );
}`}
        expectedOutput={`Child`}
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
    onClick={() => navigate('/ReactLesson9')}
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
    onClick={() => navigate('/ReactLesson11')}
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

export default ReactLesson10;
