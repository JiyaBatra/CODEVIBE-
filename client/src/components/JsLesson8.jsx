
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const JsLesson8 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/JsLesson9');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 8: Switch Statement</h1>

      <div className="lesson-content">
        <p>
          The <b>switch</b> statement is used to perform different actions based on different conditions.
        </p>
        <p>
          It’s a cleaner alternative to multiple <code>if...else if</code> statements.
        </p>
        <p>
          Syntax:<br />
          <code>
            switch(expression) &#123;<br />
            &nbsp;&nbsp;case value1:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;// code<br />
            &nbsp;&nbsp;&nbsp;&nbsp;break;<br />
            &nbsp;&nbsp;case value2:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;// code<br />
            &nbsp;&nbsp;&nbsp;&nbsp;break;<br />
            &nbsp;&nbsp;default:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;// code<br />
            &#125;
          </code>
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: switch, case, break, default</p>
      </div>

      <pre className="instructions">
{`Create a JavaScript program that:
1. Creates a variable "day" with value 3.
2. Using switch, print:
   - "Monday" if day = 1
   - "Tuesday" if day = 2
   - "Wednesday" if day = 3
   - "Invalid Day" for any other value.`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a JavaScript program that: 1. Creates a variable 'day' with value 3."
        LessonId="js-lesson-8"
        language="js"
        initialCode={`// Write your code below

`}
        expectedOutput={`Wednesday`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/JsLesson9"
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
    onClick={() => navigate('/JsLesson7')}
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
    onClick={() => navigate('/JsLesson9')}
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

export default JsLesson8;
