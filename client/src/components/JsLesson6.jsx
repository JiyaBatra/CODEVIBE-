// src/pages/JsLesson6.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const JsLesson6 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/JsLesson7');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 6: Operators in JavaScript</h1>

      <div className="lesson-content">
        <p>
          Operators are symbols used to perform operations on values or variables.
        </p>
        <ul>
          <li><b>Arithmetic Operators:</b> +, -, *, /, %</li>
          <li><b>Assignment Operators:</b> =, +=, -=</li>
          <li><b>Comparison Operators:</b> ==, ===, !=, !==, &gt;, &lt;</li>
          <li><b>Logical Operators:</b> &amp;&amp;, ||, !</li>
        </ul>
        <p>
          Example:<br />
          <code>let a = 5, b = 2;</code><br />
          <code>console.log(a + b); // 7</code><br />
          <code>console.log(a &gt; b); // true</code>
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: +, -, *, /, %, ==, ===, !=, &gt;, &lt;, &amp;&amp;, ||</p>
      </div>

      <pre className="instructions">
{`Create a JavaScript program that:
1. Creates two variables a = 8 and b = 3.
2. Prints the sum, difference, product, and remainder of a and b.
3. Prints whether a is greater than b (true/false).`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a JavaScript program that: 1. Creates two variables a = 8 and b = 3."
        LessonId="js-lesson-6"
        language="js"
        initialCode={`// Write your code below

`}
        expectedOutput={`11
5
24
2
true`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/JsLesson7"
          style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }}
          onClick={goToNextLesson}
        >
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default JsLesson6;
