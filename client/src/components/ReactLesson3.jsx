import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const ReactLesson3 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/ReactLesson4');

  return (
    <div className="lesson">
      <h1 className="lesson-title">React Lesson 3: Components & Props</h1>

      <div className="lesson-content">
        <p>
          Components are reusable pieces of UI. Props allow passing data to components.
        </p>
        <p>Example:</p>
        <pre>
{`function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create a functional component 'Greeting'.
2. It should accept 'name' as a prop.
3. Render <h1>Hello, {name}!</h1>.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create a functional component 'Greeting'. 2. It should accept 'name' as a prop."
        LessonId="react-lesson-3"
        language="js"
        initialCode={`// Write your component here
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}`}
        expectedOutput={`Hello`}
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
    onClick={() => navigate('/ReactLesson2')}
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
    onClick={() => navigate('/ReactLesson4')}
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

export default ReactLesson3;
