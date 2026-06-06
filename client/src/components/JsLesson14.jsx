// src/pages/JsLesson14.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const JsLesson14 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/JsLesson15');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 14: Arrow Functions</h1>

      <div className="lesson-content">
        <p>
          Arrow functions provide a shorter syntax to write functions in JavaScript.
        </p>
        <p>
          Syntax:<br />
          <code>
            const functionName = (parameters) =&gt; &#123;<br />
            &nbsp;&nbsp;// code<br />
            &#125;;
          </code>
        </p>
        <p>
          Example:<br />
          <code>
            const greet = (name) =&gt; &#123;<br />
            &nbsp;&nbsp;console.log("Hello " + name);<br />
            &#125;;<br />
            greet("Jiya"); // Prints: Hello Jiya
          </code>
        </p>
        <p>
          Arrow functions are especially useful for short callbacks and functional programming.
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: arrow function, parameters, console.log()</p>
      </div>

      <pre className="instructions">
{`Create a JavaScript program that:
1. Creates an arrow function "add" that takes two parameters "a" and "b".
2. Inside the function, return the sum of a and b.
3. Call the function with values 7 and 3 and print the result.`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a JavaScript program that: 1. Creates an arrow function 'add' that takes two parameters 'a' and 'b'."
        LessonId="js-lesson-14"
        language="js"
        initialCode={`// Write your code below

`}
        expectedOutput={`10`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/JsLesson15"
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
    onClick={() => navigate('/JsLesson13')}
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
    onClick={() => navigate('/JsLesson15')}
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

export default JsLesson14;
