// src/components/CLesson1.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Compiler from './Compiler';

const CLesson1 = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCorrect(true);
  };

  const goToNextLesson = () => {
    navigate('/CLesson2');
  };

  return (
    <div className="lesson">
      <h1 className="lesson-title">Chapter 1: Hello C</h1>

      <div className="lesson-content">
        <p>
          C is a powerful, general-purpose programming language developed in the early 1970s by Dennis Ritchie at Bell Labs.
        </p>
        <p>
          Every C program starts with the <code>main()</code> function. This is where execution begins.
        </p>
        <p>
          Example:
          <code>
{`#include <stdio.h>

int main() {
    printf("Hello C");
    return 0;
}`}
          </code>
        </p>
      </div>

      <div className="tags-to-try">
        <p>Concepts to Try: printf(), #include, main()</p>
      </div>

      <pre className="instructions">
{`Write a C program that prints: Hello C`}
      </pre>

      <Compiler
        LessonId="c-lesson-1"
        language="c"
        hint="Use printf() inside main() to print Hello C. Do not forget to include stdio.h at the top and return 0 at the end."
        initialCode={`#include <stdio.h>

int main() {
    // Write your code here
    printf("Hello C");
    return 0;
}`}
        expectedOutput="Hello C"
        onSuccess={handleSuccess}
      />

      {isCorrect && (
        <Link
          to="/CLesson2"
          style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold' }}
          onClick={goToNextLesson}
        >
          ⏭ NEXT LESSON
        </Link>
      )}
    </div>
  );
};

export default CLesson1;
