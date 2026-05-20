// src/components/CLesson2.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const CLesson2 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => { setIsCorrect(true); };
  const goToNextLesson = () => { navigate('/CLesson3'); };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 2: Variables and Data Types</h1>

      <div className="lesson-content">
        <p>In C, variables are used to store data. Each variable has a <b>data type</b> which defines the kind of data it can hold.</p>
        <p>Common Data Types in C:</p>
        <ul>
          <li><code>int</code> → Stores integers (whole numbers)</li>
          <li><code>float</code> → Stores decimal numbers</li>
          <li><code>char</code> → Stores single characters</li>
        </ul>
        <p>Example:<br />
          <code>
{`#include <stdio.h>

int main() {
    int age = 20;
    float height = 5.9;
    char grade = 'A';

    printf("Age: %d\\n", age);
    printf("Height: %.1f\\n", height);
    printf("Grade: %c", grade);
    return 0;
}`}
          </code>
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: int, float, char, printf() format specifiers</p>
      </div>

      <pre className="instructions">
{`Create a C program that:
1. Declares an int variable named age with value 25
2. Declares a char variable named grade with value 'B'
3. Prints them in the format: Age: 25, Grade: B`}
      </pre>

      <Compiler
        LessonId="c-lesson-2"
        language="c"
        hint="Declare int age = 25; and char grade = 'B'; then print them using %d for integers and %c for characters."
        initialCode={`#include <stdio.h>

int main() {
    // Write your code here
    
    return 0;
}`}
        expectedOutput="Age: 25, Grade: B"
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/CLesson3" style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }} onClick={goToNextLesson}>
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default CLesson2;
