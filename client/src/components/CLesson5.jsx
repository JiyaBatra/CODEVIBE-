// src/components/CLesson5.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const CLesson5 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => { setIsCorrect(true); };
  const goToNextLesson = () => { navigate('/CLesson6'); };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 5: Loops in C (for, while)</h1>

      <div className="lesson-content">
        <p>Loops in C are used to repeat a block of code multiple times without writing it again and again.</p>
        <ul>
          <li><b>for loop</b> → Best for when you know how many times to repeat.</li>
          <li><b>while loop</b> → Runs while a condition is true.</li>
          <li><b>do-while loop</b> → Runs at least once before checking condition.</li>
        </ul>
        <p>Example:</p>
        <code>
{`#include <stdio.h>
int main() {
    for (int i = 1; i <= 5; i++) {
        printf("%d\\n", i);
    }
    return 0;
}`}
        </code>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: for loop, while loop, do-while loop</p>
      </div>

      <pre className="instructions">
{`Create a C program that:
1. Uses a for loop to print numbers from 1 to 5
(Output should be exactly:
1
2
3
4
5)`}
      </pre>

      <Compiler
        LessonId="c-lesson-5"
        language="c"
        hint="Use a for loop starting at i = 1, running while i <= 5, with i++ increment. Print each number on a new line."
        initialCode={`#include <stdio.h>

int main() {
    // Write your code here
    
    return 0;
}`}
        expectedOutput={`1\n2\n3\n4\n5`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/CLesson6" style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }} onClick={goToNextLesson}>
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
    onClick={() => navigate('/CLesson4')}
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
    onClick={() => navigate('/CLesson6')}
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

export default CLesson5;
