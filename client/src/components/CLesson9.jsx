// src/components/CLesson9.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const CLesson9 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => { setIsCorrect(true); };
  const goToNextLesson = () => { navigate('/CLesson10'); };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 9: Functions in C</h1>

      <div className="lesson-content">
        <p>Functions in C help organize code into reusable blocks. They have a return type, a name, parameters, and a body.</p>
        <p>Syntax:</p>
        <code>
{`returnType functionName(parameters) {
    // function body
}`}
        </code>
        <p>Example:</p>
        <code>
{`#include <stdio.h>

void greet() {
    printf("Hello from function!\\n");
}

int main() {
    greet(); // function call
    return 0;
}`}
        </code>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: function definition, function call, void functions</p>
      </div>

      <pre className="instructions">
{`Create a C program that:
1. Defines a function named sayHello that prints "Hello Functions".
2. Calls the function inside main.`}
      </pre>

      <Compiler
        LessonId="c-lesson-9"
        language="c"
        hint="Write void sayHello() that prints Hello Functions above main(), then call sayHello(); inside main()."
        initialCode={`#include <stdio.h>

// Write your function here

int main() {
    // Call the function
    return 0;
}`}
        expectedOutput={`Hello Functions`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/CLesson10" style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }} onClick={goToNextLesson}>
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
    onClick={() => navigate('/CLesson8')}
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
    onClick={() => navigate('/CLesson10')}
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

export default CLesson9;
