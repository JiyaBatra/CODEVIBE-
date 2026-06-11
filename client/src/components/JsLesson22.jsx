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
      <div className="tags-to-try">
  <p>Concepts to Try: template literals, backticks, {'${}'}, variables</p>
</div>
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
    onClick={() => navigate('/JsLesson21')}
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
    onClick={() => navigate('/JsLesson23')}
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

export default JsLesson22;
