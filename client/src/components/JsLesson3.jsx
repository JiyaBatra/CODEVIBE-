// src/pages/JsLesson3.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const JsLesson3 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/JsLesson4');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 3: Variables in JavaScript</h1>

      <div className="lesson-content">
        <p>
          Variables are used to store data values in JavaScript.
        </p>
        <p>
          You can create a variable using the <b>var</b>, <b>let</b>, or <b>const</b> keyword.
        </p>
        <ul>
          <li><b>var</b> → old way of declaring variables (function-scoped).</li>
          <li><b>let</b> → modern way, block-scoped, can change later.</li>
          <li><b>const</b> → block-scoped, cannot be changed after assigning.</li>
        </ul>
        <p>
          Example:<br />
          <code>var name = "Jiya";</code><br />
          <code>let age = 20;</code><br />
          <code>const pi = 3.14;</code>
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: var, let, const, console.log()</p>
      </div>

      <pre className="instructions">
{`Create a JavaScript program that:
1. Declares a variable using var named "name" with value "CodeVibe".
2. Declares a variable using let named "year" with value 2025.
3. Declares a constant named "language" with value "JavaScript".
4. Prints all three values using console.log().`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a JavaScript program that: 1. Declares a variable using var named 'name' with value 'CodeVibe'."
        LessonId="js-lesson-3"
        language="js"
        initialCode={`// Write your code below

`}
        expectedOutput={`CodeVibe
2025
JavaScript`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/JsLesson4"
          style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }}
          onClick={goToNextLesson}
        >
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default JsLesson3;
