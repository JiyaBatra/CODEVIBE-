import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const ReactLesson7 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/ReactLesson8');

  return (
    <div className="lesson">
      <h1 className="lesson-title">React Lesson 7: Forms</h1>

      <div className="lesson-content">
        <p>
          Forms in React use <code>state</code> to manage input values.
        </p>
        <p>Example:</p>
        <pre>
{`function NameForm() {
  const [name, setName] = useState('');
  return (
    <form>
      <input value={name} onChange={e => setName(e.target.value)} />
      <p>Your name: {name}</p>
    </form>
  );
}`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create a component 'NameForm'.
2. Add an input to enter name and display it below.
3. Use state to manage input value.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create a component 'NameForm'. 2. Add an input to enter name and display it below."
        LessonId="react-lesson-7"
        language="js"
        initialCode={`function NameForm() {
  const [name, setName] = useState('');
  return (
    <form>
      <input value={name} onChange={e => setName(e.target.value)} />
      <p>Your name: {name}</p>
    </form>
  );
}`}
        expectedOutput={`Your name`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/ReactLesson8" onClick={goToNextLesson} className="next-lesson">
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default ReactLesson7;
