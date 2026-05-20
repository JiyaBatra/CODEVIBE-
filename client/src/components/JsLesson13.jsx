// src/pages/JsLesson13.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const JsLesson13 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/JsLesson14');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 13: Return Statement in Functions</h1>

      <div className="lesson-content">
        <p>
          The <b>return</b> statement allows a function to send a value back to where it was called.
        </p>
        <p>
          Syntax:<br />
          <code>
            function functionName(parameters) &#123;<br />
            &nbsp;&nbsp;// code<br />
            &nbsp;&nbsp;return value;<br />
            &#125;
          </code>
        </p>
        <p>
          Example:<br />
          <code>
            function add(a, b) &#123;<br />
            &nbsp;&nbsp;return a + b;<br />
            &#125;<br />
            let result = add(5, 3);<br />
            console.log(result); // 8
          </code>
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: return, function, parameters, variable assignment</p>
      </div>

      <pre className="instructions">
{`Create a JavaScript program that:
1. Creates a function "multiply" that takes two parameters "x" and "y".
2. Inside the function, return the product of x and y.
3. Call the function with values 4 and 5, store it in a variable, and print the result.`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a JavaScript program that: 1. Creates a function 'multiply' that takes two parameters 'x' and 'y'."
        LessonId="js-lesson-13"
        language="js"
        initialCode={`// Write your code below

`}
        expectedOutput={`20`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/JsLesson14"
          style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }}
          onClick={goToNextLesson}
        >
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default JsLesson13;
