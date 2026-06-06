// src/components/CLesson6.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const CLesson6 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => { setIsCorrect(true); };
  const goToNextLesson = () => { navigate('/CLesson7'); };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 6: Functions in C</h1>

      <div className="lesson-content">
        <p>Functions are blocks of code that perform a specific task. They make code reusable and organized.</p>
        <p>Two main types of functions in C:</p>
        <ul>
          <li><b>Library Functions</b> (e.g., <code>printf()</code>, <code>scanf()</code>)</li>
          <li><b>User-Defined Functions</b> (functions we create ourselves)</li>
        </ul>
        <p>Example of a function:</p>
        <code>
{`#include <stdio.h>

// Function declaration
void greet() {
    printf("Hello from a function!\\n");
}

int main() {
    greet(); // Calling the function
    return 0;
}`}
        </code>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: function declaration, definition, and calling</p>
      </div>

      <pre className="instructions">
{`Create a C program that:
1. Defines a function called sayHello().
2. This function should print:
Hello from my function!
3. Call this function from main().`}
      </pre>

      <Compiler
        LessonId="c-lesson-6"
        language="c"
        hint="Define a function void sayHello() that prints the text, then call sayHello(); inside main()."
        initialCode={`#include <stdio.h>

// Write your function here

int main() {
    // Call the function here
    
    return 0;
}`}
        expectedOutput={`Hello from my function!`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/CLesson7" style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }} onClick={goToNextLesson}>
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
    onClick={() => navigate('/CLesson5')}
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
    onClick={() => navigate('/CLesson7')}
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

export default CLesson6;
