// src/pages/JsLesson27.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const JsLesson27 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/JsLesson28');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 27: Fetch API</h1>

      <div className="lesson-content">
        <p>
          The <b>Fetch API</b> allows JavaScript to make HTTP requests to get or send data to a server.
        </p>
        <p>
          Example:<br />
          <code>
            fetch('https://jsonplaceholder.typicode.com/todos/1')<br />
            &nbsp;&nbsp;.then(response =&gt; response.json())<br />
            &nbsp;&nbsp;.then(data =&gt; console.log(data));<br />
          </code>
        </p>
        <p>
          You can also use <b>async/await</b> for cleaner syntax:
          <br />
          <code>
            async function getData() &#123;<br />
            &nbsp;&nbsp;let res = await fetch('https://jsonplaceholder.typicode.com/todos/1');<br />
            &nbsp;&nbsp;let data = await res.json();<br />
            &nbsp;&nbsp;console.log(data);<br />
            &#125;<br />
            getData();
          </code>
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: fetch, async/await, .json(), API call</p>
      </div>

      <pre className="instructions">
{`Create a JavaScript program that:
1. Uses fetch to get data from "https://jsonplaceholder.typicode.com/todos/1".
2. Prints the title from the fetched data.`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a JavaScript program that: 1. Uses fetch to get data from 'https://jsonplaceholder.typicode.com/todos..."
        LessonId="js-lesson-27"
        language="js"
        initialCode={`// Write your code below

`}
        expectedOutput={`delectus aut autem`}
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
    onClick={() => navigate('/JsLesson26')}
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
    onClick={() => navigate('/JsLesson28')}
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

export default JsLesson27;
