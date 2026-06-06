
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const JsLesson9 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/JsLesson10');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 9: For Loop</h1>

      <div className="lesson-content">
        <p>
          The <b>for</b> loop is used to run a block of code a specific number of times.
        </p>
        <p>
          Syntax:<br />
          <code>
            for(initialization; condition; increment/decrement) &#123;<br />
            &nbsp;&nbsp;// code<br />
            &#125;
          </code>
        </p>
        <p>
          Example:<br />
          <code>
            for(let i = 1; i &lt;= 5; i++) &#123;<br />
            &nbsp;&nbsp;console.log(i);<br />
            &#125;
          </code>
          <br />This will print numbers 1 to 5.
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: for loop, increment (i++), decrement (i--)</p>
      </div>

      <pre className="instructions">
{`Create a JavaScript program that:
1. Uses a for loop to print numbers from 1 to 5, each on a new line.`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a JavaScript program that: 1. Uses a for loop to print numbers from 1 to 5, each on a new line."
        LessonId="js-lesson-9"
        language="js"
        initialCode={`// Write your code below

`}
        expectedOutput={`1
2
3
4
5`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/JsLesson10"
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
    onClick={() => navigate('/JsLesson8')}
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
    onClick={() => navigate('/JsLesson10')}
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

export default JsLesson9;
