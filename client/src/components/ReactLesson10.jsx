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

      {isCorrect && (
        <Link to="/ReactLesson11" onClick={goToNextLesson} className="next-lesson">
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default ReactLesson10;
