// src/components/CLesson12.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const CLesson12 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => { setIsCorrect(true); };
  const goToNextLesson = () => { navigate('/CLesson13'); };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 12: Functions in C</h1>

      <div className="lesson-content">
        <p>Functions in C are blocks of code that perform a specific task. They help to make your code modular, reusable, and easier to debug.</p>
        <p>You can create your own functions in addition to the built-in ones.</p>
        <p>Example:<br />
          <code>
{`#include <stdio.h>

void greet() {
    printf("Hello from function!\\n");
}

int main() {
    greet();
    return 0;
}`}
          </code>
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: function definition, function call</p>
      </div>

      <pre className="instructions">
{`Task:
1. Create a function named 'welcome' that prints "Welcome to C Functions".
2. Call this function inside main().`}
      </pre>

      <Compiler
        LessonId="c-lesson-12"
        language="c"
        hint="Write void welcome() that prints Welcome to C Functions, then call welcome(); inside main()."
        initialCode={`#include <stdio.h>

// Write your function here

int main() {
    // Call your function here
    return 0;
}`}
        expectedOutput={`Welcome to C Functions`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/CLesson13" style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }} onClick={goToNextLesson}>
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
    onClick={() => navigate('/CLesson11')}
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
    onClick={() => navigate('/CLesson13')}
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

export default CLesson12;
