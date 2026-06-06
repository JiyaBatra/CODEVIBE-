import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const ReactLesson9 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/ReactLesson10');

  return (
    <div className="lesson">
      <h1 className="lesson-title">React Lesson 9: Conditional Rendering</h1>

      <div className="lesson-content">
        <p>
          Conditional rendering in React is done using <code>if</code> statements or ternary operators.
        </p>
        <p>Example:</p>
        <pre>
{`function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <h1>Welcome Back!</h1> : <h1>Please Sign In</h1>}
    </div>
  );
}`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create a component 'Greeting'.
2. Pass a prop 'isLoggedIn'.
3. Render 'Welcome Back!' if true, else 'Please Sign In'.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create a component 'Greeting'. 2. Pass a prop 'isLoggedIn'."
        LessonId="react-lesson-9"
        language="js"
        initialCode={`function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <h1>Welcome Back!</h1> : <h1>Please Sign In</h1>}
    </div>
  );
}`}
        expectedOutput={`Welcome Back`}
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
    onClick={() => navigate('/ReactLesson8')}
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
    onClick={() => navigate('/ReactLesson10')}
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

export default ReactLesson9;
