import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const ReactLesson2 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/ReactLesson3');

  return (
    <div className="lesson">
      <h1 className="lesson-title">React Lesson 2: JSX Basics</h1>

      <div className="lesson-content">
        <p>
          JSX allows writing HTML inside JavaScript. It makes React code more readable.
        </p>
        <p>Example:</p>
        <pre>
{`const element = <h1>Hello JSX!</h1>;`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create a JSX element that renders <h1>Hello JSX!</h1>.
2. Assign it to a variable called 'element'.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create a JSX element that renders <h1>Hello JSX!</h1>. 2. Assign it to a variable called 'element'."
        LessonId="react-lesson-2"
        language="js"
        initialCode={`// Write your JSX code here
const element = <h1>Hello JSX!</h1>;`}
        expectedOutput={`Hello JSX!`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/ReactLesson3" onClick={goToNextLesson} className="next-lesson">
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default ReactLesson2;
