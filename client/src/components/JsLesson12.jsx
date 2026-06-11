// src/pages/JsLesson12.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const JsLesson12 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/JsLesson13');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 12: Functions in JavaScript</h1>

      <div className="lesson-content">
        <p>
          Functions are reusable blocks of code that perform a specific task.
        </p>
        <p>
          Syntax:<br />
          <code>
            function functionName(parameters) &#123;<br />
            &nbsp;&nbsp;// code<br />
            &#125;
          </code>
        </p>
        <p>
          Example:<br />
          <code>
            function greet(name) &#123;<br />
            &nbsp;&nbsp;console.log("Hello " + name);<br />
            &#125;<br />
            greet("Jiya"); // Prints: Hello Jiya
          </code>
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: function, parameters, return, console.log()</p>
      </div>

      <pre className="instructions">
{`Create a JavaScript program that:
1. Creates a function named "sayHello" that takes a parameter "name".
2. Inside the function, print "Hello " followed by the name.
3. Call the function with the name "CodeVibe".`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a JavaScript program that: 1. Creates a function named 'sayHello' that takes a parameter 'name'."
        LessonId="js-lesson-12"
        language="js"
        initialCode={`// Write your code below

`}
        expectedOutput={`Hello CodeVibe`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/JsLesson13"
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
    onClick={() => navigate('/JsLesson11')}
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
    onClick={() => navigate('/JsLesson13')}
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

export default JsLesson12;
