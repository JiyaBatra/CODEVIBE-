
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const JsLesson2 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/JsLesson3');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 2: Comments in JavaScript</h1>

      <div className="lesson-content">
        <p>
          Comments are notes in your code that the computer ignores. 
          They help you explain what the code does, making it easier to understand later.
        </p>
        <p>
          In JavaScript, there are two types of comments:
        </p>
        <ul>
          <li><b>Single-line comment:</b> Starts with <code>//</code></li>
          <li><b>Multi-line comment:</b> Starts with <code>/*</code> and ends with <code>*/</code></li>
        </ul>
        <p>
          Example:<br />
          <code>// This is a single-line comment</code><br />
          <code>/* This is a multi-line comment */</code>
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: //, /* */</p>
      </div>

      <pre className="instructions">
{`Create a JavaScript program that:
1. Prints "Learning Comments" in the console.
2. Above that line, add a single-line comment saying: This program shows comments.
3. Below that line, add a multi-line comment saying: Comments are ignored by JavaScript.`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a JavaScript program that: 1. Prints 'Learning Comments' in the console."
        LessonId="js-lesson-2"
        language="js"
        initialCode={`// Write your code below

`}
        expectedOutput={`Learning Comments`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/JsLesson3"
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
    justifyContent: "space-between",
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #333"
  }}
>
  <button
    onClick={() => navigate('/JsLesson1')}
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
    onClick={() => navigate('/JsLesson3')}
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

export default JsLesson2;
