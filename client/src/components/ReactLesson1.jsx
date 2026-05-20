import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const ReactLesson1 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/ReactLesson2');

  return (
    <div className="lesson">
      <h1 className="lesson-title">React Lesson 1: Introduction to React</h1>

      <div className="lesson-content">
        <p>
          React is a JavaScript library used to build interactive UI components. It uses a component-based structure.
        </p>
        <p>
          Example of a simple component:
        </p>
        <pre>
{`function Hello() {
  return <h1>Hello, React!</h1>;
}`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create a functional component called 'Hello'.
2. It should render <h1>Hello, React!</h1>.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create a functional component called 'Hello'. 2. It should render <h1>Hello, React!</h1>."
        LessonId="react-lesson-1"
        language="js"
        initialCode={`// Write your React component here
function Hello() {
  return <h1>Hello, React!</h1>;
}`}
        expectedOutput={`Hello, React!`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/ReactLesson2" onClick={goToNextLesson} className="next-lesson">
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default ReactLesson1;
