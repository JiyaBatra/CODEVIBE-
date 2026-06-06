// src/components/CLesson13.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const CLesson13 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => setIsCorrect(true);
  const goToNextLesson = () => navigate('/CLesson14');

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 13: Pointers in C</h1>

      <div className="lesson-content">
        <p>A pointer is a variable that stores the memory address of another variable. They are powerful for memory management and working with arrays, strings, and functions.</p>
        <p>Example:</p>
        <pre>
{`#include <stdio.h>

int main() {
    int num = 10;
    int *ptr = &num;
    printf("%d", *ptr); // prints 10
    return 0;
}`}
        </pre>
      </div>

      <pre className="instructions">
{`Task:
1. Declare an integer variable with value 42 and a pointer to it.
2. Use the pointer to print the value.`}
      </pre>

      <Compiler
        LessonId="c-lesson-13"
        language="c"
        hint="Declare int num = 42; and int *ptr = &num; then use printf with *ptr to print the value via the pointer."
        initialCode={`#include <stdio.h>

int main() {
    // Write your code here
    return 0;
}`}
        expectedOutput={`42`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/CLesson14" className="next-lesson" onClick={goToNextLesson}>
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
    onClick={() => navigate('/CLesson12')}
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
    onClick={() => navigate('/CLesson14')}
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

export default CLesson13;
