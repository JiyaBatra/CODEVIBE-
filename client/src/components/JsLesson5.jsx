// src/pages/JsLesson5.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const JsLesson5 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/JsLesson6');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 5: Operators in JavaScript</h1>

      <div className="lesson-content">
        <p>
          Expressions in JavaScript are combinations of values, variables,
          and operators that produce a result.
        </p>

        <ul>
          <li><b>Arithmetic Expressions:</b> Used for mathematical calculations</li>
          <li><b>Comparison Expressions:</b> Used to compare values</li>
          <li><b>Logical Expressions:</b> Used to combine conditions</li>
        </ul>

        <p>
          Example:<br />
          <code>let x = 10, y = 5;</code><br />
          <code>console.log(x + y); // 15</code><br />
          <code>console.log(x &gt; y); // true</code><br />
          <code>console.log((x + y) * 2); // 30</code>
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: +, -, *, /, &gt;, &lt;, ==, ===, &amp;&amp;, ||</p>
      </div>

      <pre className="instructions">
{`Create a JavaScript program that:
1. Creates two variables x = 12 and y = 4.
2. Uses expressions to calculate:
   - sum
   - product
   - division
3. Prints all results using console.log().
4. Prints whether the sum is greater than 10.`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a JavaScript program that: 1. Creates two variables a = 8 and b = 3."
        LessonId="js-lesson-5"
        language="javascript"
        initialCode={`// Write your code below

`}
        expectedOutput={`16
48
3
true`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/JsLesson6"
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
    onClick={() => navigate('/JsLesson4')}
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
    onClick={() => navigate('/JsLesson6')}
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

export default JsLesson5;
