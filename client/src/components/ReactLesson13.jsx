import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const ReactLesson13 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/ReactLesson14');

  return (
    <div className="lesson">
      <h1 className="lesson-title">React Lesson 13: useEffect Hook</h1>

      <div className="lesson-content">
        <p>
          The <code>useEffect</code> hook runs side effects in functional components.
        </p>
        <p>Example:</p>
        <pre>
{`useEffect(() => {
  console.log('Component mounted or updated');
}, []);`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Use useEffect to log 'Hello React' on mount.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Use useEffect to log 'Hello React' on mount."
        LessonId="react-lesson-13"
        language="js"
        initialCode={`useEffect(() => {
  console.log('Hello React');
}, []);`}
        expectedOutput={`Hello React`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/ReactLesson14" onClick={goToNextLesson} className="next-lesson">
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default ReactLesson13;
