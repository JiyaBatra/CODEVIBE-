import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const ReactLesson5 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/ReactLesson6');

  return (
    <div className="lesson">
      <h1 className="lesson-title">React Lesson 5: Conditional Rendering</h1>

      <div className="lesson-content">
        <p>
          Conditional rendering allows components to render different output based on conditions.
        </p>
        <p>Example:</p>
        <pre>
{`function Greeting({ isLoggedIn }) {
  return <h1>{isLoggedIn ? "Welcome!" : "Please log in"}</h1>;
}`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create a component 'Greeting'.
2. Pass a boolean prop 'isLoggedIn'.
3. Render "Welcome!" if true, otherwise "Please log in".`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create a component 'Greeting'. 2. Pass a boolean prop 'isLoggedIn'."
        LessonId="react-lesson-5"
        language="js"
        initialCode={`function Greeting({ isLoggedIn }) {
  return <h1>{isLoggedIn ? "Welcome!" : "Please log in"}</h1>;
}`}
        expectedOutput={`Welcome`}
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
    onClick={() => navigate('/ReactLesson4')}
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
    onClick={() => navigate('/ReactLesson6')}
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

export default ReactLesson5;
