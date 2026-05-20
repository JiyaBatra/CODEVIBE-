import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const ReactLesson6 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/ReactLesson7');

  return (
    <div className="lesson">
      <h1 className="lesson-title">React Lesson 6: Lists and Keys</h1>

      <div className="lesson-content">
        <p>
          Lists in React are rendered using <code>map()</code>. Each element needs a unique key.
        </p>
        <p>Example:</p>
        <pre>
{`function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
    </ul>
  );
}`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Create a component 'TodoList'.
2. Render a list of todos passed as prop.
3. Ensure each list item has a unique key.`}
      </pre>

      <Compiler
        hint="💡 Hint: 1. Create a component 'TodoList'. 2. Render a list of todos passed as prop."
        LessonId="react-lesson-6"
        language="js"
        initialCode={`function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
    </ul>
  );
}`}
        expectedOutput={`<li>`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/ReactLesson7" onClick={goToNextLesson} className="next-lesson">
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default ReactLesson6;
