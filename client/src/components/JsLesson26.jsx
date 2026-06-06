// src/pages/JsLesson26.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const JsLesson26 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/JsLesson27');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 26: Promises & Async/Await</h1>

      <div className="lesson-content">
        <p>
          A <b>Promise</b> represents an operation that will complete in the future.  
          <b>Async/Await</b> allows writing asynchronous code in a synchronous style.
        </p>
        <p>
          Example (Promise):<br />
          <code>
            let p = new Promise((resolve, reject) =&gt; &#123;<br />
            &nbsp;&nbsp;setTimeout(() =&gt; resolve("Done!"), 1000);<br />
            &#125;);<br />
            p.then(msg =&gt; console.log(msg)); // Done! after 1 sec
          </code>
        </p>
        <p>
          Example (Async/Await):<br />
          <code>
            async function greet() &#123;<br />
            &nbsp;&nbsp;let message = await p;<br />
            &nbsp;&nbsp;console.log(message);<br />
            &#125;<br />
            greet(); // Done! after 1 sec
          </code>
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: Promise, resolve, reject, then, async, await</p>
      </div>

      <pre className="instructions">
{`Create a JavaScript program that:
1. Creates a Promise that resolves "Hello CodeVibe" after 1 second.
2. Use async/await to get the value and print it.`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a JavaScript program that: 1. Creates a Promise that resolves 'Hello CodeVibe' after 1 second."
        LessonId="js-lesson-26"
        language="js"
        initialCode={`// Write your code below

`}
        expectedOutput={`Hello CodeVibe`}
        onSuccess={handleSuccess}
      />

     
      
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
    onClick={() => navigate('/JsLesson25')}
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
    onClick={() => navigate('/JsLesson27')}
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

export default JsLesson26;
