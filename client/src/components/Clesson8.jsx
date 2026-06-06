// src/components/Clesson8.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const CLesson8 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => { setIsCorrect(true); };
  const goToNextLesson = () => { navigate('/CLesson9'); };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 8: Strings in C</h1>

      <div className="lesson-content">
        <p>A string in C is an array of characters ending with a null character (<code>'\0'</code>). C does not have a built-in string type — we use character arrays instead.</p>
        <p>Example:</p>
        <code>
{`#include <stdio.h>
int main() {
    char name[] = "Alice";
    printf("Hello %s\\n", name);
    return 0;
}`}
        </code>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: char arrays, null terminator, printf with %s</p>
      </div>

      <pre className="instructions">
{`Create a C program that:
1. Declares a char array and stores the word "World".
2. Prints: Hello World (using printf and your char array).`}
      </pre>

      <Compiler
        LessonId="c-lesson-8"
        language="c"
        hint="Declare char str[] = world and use printf to combine Hello with that string."
        initialCode={`#include <stdio.h>

int main() {
    // Declare and initialize char array
    
    // Print "Hello World"
    
    return 0;
}`}
        expectedOutput={`Hello World`}
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link to="/CLesson9" style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }} onClick={goToNextLesson}>
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
    onClick={() => navigate('/CLesson7')}
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
    onClick={() => navigate('/CLesson9')}
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

export default CLesson8;
