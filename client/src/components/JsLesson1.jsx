import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const JsLesson1 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/JsLesson2');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 1: Introduction to JavaScript</h1>

      <div className="lesson-content">
        <p>
          JavaScript is a programming language used to make websites interactive and dynamic.
        </p>
        <p>
          It runs inside the browser and can be used to create animations, handle user actions, and
          change HTML content without reloading the page.
        </p>
        <p>
          Example:<br />
          <code>console.log("Hello World");</code> → Prints "Hello World" in the browser console.
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: console.log(), JavaScript code inside &lt;script&gt; tag</p>
      </div>

      <pre className="instructions">
{`Create a JavaScript program that:
1. Prints "Hello JavaScript" in the browser console using console.log().`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a JavaScript program that: 1. Prints 'Hello JavaScript' in the browser console using console.log()."
  LessonId="dsa-lesson-1"
  language="js"
  initialCode={`// Write your code here
console.log("Welcome to DSA");`}
  expectedOutput={`Welcome to DSA`}
  onSuccess={handleSuccess}
/>

      {isCorrect && (
        <Link
          to="/JsLesson2"
          style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }}
          onClick={goToNextLesson}
        >
          ⏭ NEXT LESSON
        </Link>
      )}
       {/* Lesson Footer Navigation */}
<div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #333"
  }}
>
  <button
    onClick={() => navigate('/JSLesson2')}
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

export default JsLesson1;
