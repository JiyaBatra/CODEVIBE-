// src/components/CLesson3.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const CLesson3 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => { setIsCorrect(true); };
  const goToNextLesson = () => { navigate('/CLesson4'); };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 3: Operators in C</h1>

      <div className="lesson-content">
        <p>Operators in C are special symbols that perform operations on variables and values.</p>
        <p>Types of Operators:</p>
        <ul>
          <li><b>Arithmetic Operators</b> → <code>+, -, *, /, %</code></li>
          <li><b>Relational Operators</b> → <code>==, !=, &gt;, &lt;, &gt;=, &lt;=</code></li>
          <li><b>Logical Operators</b> → <code>&& (AND), || (OR), ! (NOT)</code></li>
        </ul>
        <p>Example:<br />
          <code>
{`#include <stdio.h>

int main() {
    int a = 10, b = 5;
    printf("Sum: %d\\n", a + b);
    printf("Is a greater than b? %d", a > b);
    return 0;
}`}
          </code>
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: +, -, *, /, %, relational operators</p>
      </div>

      <pre className="instructions">
{`Create a C program that:
1. Declares two integers: num1 = 8, num2 = 3
2. Prints their sum, difference, and product in this format:
Sum: 11
Difference: 5
Product: 24`}
      </pre>

      <Compiler
        LessonId="c-lesson-3"
        language="c"
        hint="Declare num1 = 8 and num2 = 3. Use three separate printf() calls for Sum, Difference, and Product on separate lines."
        initialCode={`#include <stdio.h>

int main() {
    // Write your code here
    
    return 0;
}`}
        expectedOutput={`Sum: 11\nDifference: 5\nProduct: 24`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/CLesson4" style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }} onClick={goToNextLesson}>
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
    onClick={() => navigate('/CLesson2')}
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
    onClick={() => navigate('/CLesson4')}
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

export default CLesson3;
