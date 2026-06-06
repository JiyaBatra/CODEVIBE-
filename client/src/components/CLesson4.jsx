// src/components/CLesson4.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const CLesson4 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => { setIsCorrect(true); };
  const goToNextLesson = () => { navigate('/CLesson5'); };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 4: Conditional Statements (if, else)</h1>

      <div className="lesson-content">
        <p>Conditional statements in C are used to make decisions based on certain conditions.</p>
        <ul>
          <li><b>if</b> → Runs a block of code if a condition is true.</li>
          <li><b>if-else</b> → Runs one block if condition is true, otherwise runs another.</li>
          <li><b>else if</b> → Checks multiple conditions in sequence.</li>
        </ul>
        <p>Example:</p>
        <code>
{`#include <stdio.h>
int main() {
    int age = 18;
    if (age >= 18) {
        printf("You are an adult.");
    } else {
        printf("You are not an adult.");
    }
    return 0;
}`}
        </code>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: if, else, else if, comparison operators</p>
      </div>

      <pre className="instructions">
{`Create a C program that:
1. Declares an integer 'marks' = 75
2. If marks >= 50, print "Pass"
3. Else print "Fail"`}
      </pre>

      <Compiler
        LessonId="c-lesson-4"
        language="c"
        hint="Declare int marks = 75; then use if (marks >= 50) to print Pass, otherwise print Fail."
        initialCode={`#include <stdio.h>

int main() {
    // Write your code here
    
    return 0;
}`}
        expectedOutput={`Pass`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/CLesson5" style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }} onClick={goToNextLesson}>
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
    onClick={() => navigate('/CLesson3')}
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
    onClick={() => navigate('/CLesson5')}
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

export default CLesson4;
