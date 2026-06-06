// src/components/CLesson16.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const CLesson16 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/CLesson17');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Mini Project 1: Calculator</h1>

      <div className="lesson-content">
        <p>Let's build a simple calculator in C that can add, subtract, multiply, and divide.</p>
        <p>Example:</p>
        <pre>
{`#include <stdio.h>

int main() {
    int a = 5, b = 3;
    printf("%d", a + b); // Output: 8
    return 0;
}`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Take two numbers (fixed values for this test).
2. Perform addition and print the result.
Expected Output: 15`}
      </pre>

      <Compiler
        LessonId="c-lesson-16"
        language="c"
        hint="Declare two integers that add up to 15, such as a = 10 and b = 5. Then print their sum using printf."
        initialCode={`#include <stdio.h>

int main() {
    // Write your calculator addition here
    return 0;
}`}
        expectedOutput={`15`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/CLesson17" className="next-lesson" onClick={goToNextLesson}>
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
    onClick={() => navigate('/CLesson15')}
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
    onClick={() => navigate('/CLesson17')}
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

export default CLesson16;
