
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const JsLesson7 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/JsLesson8');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 7: Conditional Statements</h1>

      <div className="lesson-content">
        <p>
          Conditional statements allow you to run different code depending on a condition.
        </p>
        <ul>
          <li><b>if</b> → Runs code if the condition is true.</li>
          <li><b>else if</b> → Checks another condition if the first is false.</li>
          <li><b>else</b> → Runs if all conditions are false.</li>
        </ul>
        <p>
          Example:<br />
          <code>
            let age = 18;<br />
            if (age &gt;= 18) &#123;<br />
            &nbsp;&nbsp;console.log("Adult");<br />
            &#125; else &#123;<br />
            &nbsp;&nbsp;console.log("Minor");<br />
            &#125;
          </code>
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: if, else if, else</p>
      </div>

      <pre className="instructions">
{`Create a JavaScript program that:
1. Creates a variable "marks" with value 75.
2. If marks >= 90, print "Grade A".
3. Else if marks >= 60, print "Grade B".
4. Else, print "Grade C".`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a JavaScript program that: 1. Creates a variable 'marks' with value 75."
        LessonId="js-lesson-7"
        language="js"
        initialCode={`// Write your code below

`}
        expectedOutput={`Grade B`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/JsLesson8"
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
    onClick={() => navigate('/JsLesson6')}
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
    onClick={() => navigate('/JsLesson8')}
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

export default JsLesson7;
