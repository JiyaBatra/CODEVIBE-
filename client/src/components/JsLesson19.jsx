// src/pages/JsLesson19.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const JsLesson19 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/JsLesson20');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 19: DOM Manipulation Basics</h1>

      <div className="lesson-content">
        <p>
          The <b>DOM (Document Object Model)</b> represents the structure of a webpage.  
          JavaScript can interact with the DOM to change content, styles, or structure dynamically.
        </p>
        <p>
          Example:<br />
          <code>
            &lt;h1 id="title"&gt;Hello&lt;/h1&gt;<br />
            &lt;script&gt;<br />
            &nbsp;&nbsp;document.getElementById("title").innerText = "Welcome";<br />
            &lt;/script&gt;
          </code>
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: document.getElementById, innerText, innerHTML</p>
      </div>

      <pre className="instructions">
{`Create a JavaScript program that:
1. Has a heading with id "greeting" and text "Hello".
2. Using JavaScript, change the heading text to "Hello CodeVibe".`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a JavaScript program that: 1. Has a heading with id 'greeting' and text 'Hello'."
        LessonId="js-lesson-19"
        language="js"
        initialCode={`// Write your code below

`}
        expectedOutput={`Hello CodeVibe`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/JsLesson20"
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
    onClick={() => navigate('/JsLesson18')}
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
    onClick={() => navigate('/JsLesson20')}
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

export default JsLesson19;
