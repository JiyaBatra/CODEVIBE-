// src/pages/JsLesson11.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const JsLesson11 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/JsLesson12');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 11: Do...While Loop</h1>

      <div className="lesson-content">
        <p>
          The <b>do...while</b> loop executes the code block once, and then repeats it as long as the condition is true.
        </p>
        <p>
          Syntax:<br />
          <code>
            do &#123;<br />
            &nbsp;&nbsp;// code<br />
            &#125; while(condition);
          </code>
        </p>
        <p>
          Example:<br />
          <code>
            let i = 1;<br />
            do &#123;<br />
            &nbsp;&nbsp;console.log(i);<br />
            &nbsp;&nbsp;i++;<br />
            &#125; while(i &lt;= 3);
          </code>
          <br />This will print numbers 1 to 3.
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: do...while loop, condition check, increment</p>
      </div>

      <pre className="instructions">
{`Create a JavaScript program that:
1. Uses a do...while loop to print numbers from 1 to 2, each on a new line.`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a JavaScript program that: 1. Uses a do...while loop to print numbers from 1 to 2, each on a new line."
        LessonId="js-lesson-11"
        language="js"
        initialCode={`// Write your code below

`}
        expectedOutput={`1
2`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/JsLesson12"
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
    onClick={() => navigate('/JsLesson10')}
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
    onClick={() => navigate('/JsLesson12')}
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

export default JsLesson11;
