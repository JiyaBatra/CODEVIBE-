// src/pages/JsLesson28.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from '../components/Compiler';

const JsLesson28 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/JsLesson29');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 28: Local Storage & Session Storage</h1>

      <div className="lesson-content">
        <p>
          <b>Local Storage</b> and <b>Session Storage</b> let you store data in the browser.
        </p>
        <p>
          - Local Storage: persists even after closing the browser.<br />
          - Session Storage: persists only until the browser/tab is closed.
        </p>
        <p>
          Example (Local Storage):<br />
          <code>
            localStorage.setItem('name', 'CodeVibe');<br />
            console.log(localStorage.getItem('name')); // CodeVibe
          </code>
        </p>
        <p>
          Example (Session Storage):<br />
          <code>
            sessionStorage.setItem('age', '18');<br />
            console.log(sessionStorage.getItem('age')); // 18
          </code>
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: localStorage, sessionStorage, setItem, getItem</p>
      </div>

      <pre className="instructions">
{`Create a JavaScript program that:
1. Stores "CodeVibe" in localStorage with key "platform".
2. Retrieves and prints the value from localStorage.`}
      </pre>

      <Compiler
        hint="💡 Hint: Create a JavaScript program that: 1. Stores 'CodeVibe' in localStorage with key 'platform'."
        LessonId="js-lesson-28"
        language="js"
        initialCode={`// Write your code below

`}
        expectedOutput={`CodeVibe`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/JsLesson29"
          style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }}
          onClick={goToNextLesson}
        >
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default JsLesson28;
