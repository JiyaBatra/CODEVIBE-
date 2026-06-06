// src/components/CLesson10.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const CLesson10 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => { setIsCorrect(true); };
  const goToNextLesson = () => { navigate('/CLesson11'); };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 10: Arrays and Loops in C</h1>

      <div className="lesson-content">
        <p>Arrays store multiple values of the same type in a single variable. Loops (like <code>for</code>) help us process array elements one by one.</p>
        <p>Example:</p>
        <code>
{`#include <stdio.h>

int main() {
    int numbers[5] = {1, 2, 3, 4, 5};

    for(int i = 0; i < 5; i++) {
        printf("%d\\n", numbers[i]);
    }

    return 0;
}`}
        </code>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: array declaration, initialization, for loop iteration</p>
      </div>

      <pre className="instructions">
{`Create a C program that:
1. Creates an integer array of size 3 with values 10, 20, 30.
2. Uses a for loop to print all elements (each on a new line).`}
      </pre>

      <Compiler
        LessonId="c-lesson-10"
        language="c"
        hint="Create int arr[3] = {10, 20, 30}; then use a for loop from i=0 to i<3 to print each element on a new line."
        initialCode={`#include <stdio.h>

int main() {
    // Create your array here
    
    // Use for loop to print elements
    
    return 0;
}`}
        expectedOutput={`10\n20\n30`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/CLesson11" style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }} onClick={goToNextLesson}>
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
    onClick={() => navigate('/CLesson9')}
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
    onClick={() => navigate('/CLesson11')}
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

export default CLesson10;
