// src/pages/JsLesson22.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const JsLesson22 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/JsLesson23');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 22: Template Literals</h1>

      <div className="lesson-content">
        <p>
          Template literals allow you to embed variables and expressions inside strings using backticks <code>` `</code> instead of quotes.
        </p>
        <p>
          Syntax:<br />
          <code>
            `Hello ${variable}, welcome!`
          </code>
        </p>
        <p>
          Example:<br />
          <code>
            let name = "Jiya";<br />
            console.log(`Hello ${name}, welcome to CodeVibe!`);<br />
            // Output: Hello Jiya, welcome to CodeVibe!
          </code>
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: template literals, backticks, ${}, variables</p>
      </div>

      <pre className="instructions">
{`Create a JavaScript program that:
1. Creates a variable "name" with value "CodeVibe".
2. Prints "Hello CodeVibe, your journey begins!" using template literals.`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a JavaScript program that: 1. Creates a variable 'name' with value 'CodeVibe'."
        LessonId="js-lesson-22"
        language="js"
        initialCode={`// Write your code below

`}
        expectedOutput={`Hello CodeVibe, your journey begins!`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/JsLesson23"
          style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }}
          onClick={goToNextLesson}
        >
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default JsLesson22;
